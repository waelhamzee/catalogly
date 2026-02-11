import { generateDescriptions } from "../helpers/generateDescriptions.js";
import { generateTitles } from "../helpers/generateTitles.js";
import { pickBetween } from "../helpers/pickBetween.js";
import { shuffle } from "../helpers/shuffle.js";
import { Author } from "../modules/authors/author.model.js";
import { BookAuthor } from "../modules/book-authors/book-author.model.js";
import { BookCover } from "../modules/book-covers/book-cover.model.js";
import { BookGenre } from "../modules/book-genres/book-genre.model.js";
import { Book } from "../modules/books/book.model.js";
import { File } from "../modules/files/file.model.js";
import { Genre } from "../modules/genres/genre.model.js";
import { Language } from "../modules/languages/language.model.js";

const TOTAL_BOOKS = 350;
const TOTAL_COVERS = 500;

function randomIsbn(): string | null {
  if (Math.random() <= 0.5) return null;
  return "978" + String(Math.floor(Math.random() * 1e10)).padStart(10, "0");
}

function coverCountsPerBook(): number[] {
  const counts = new Array(TOTAL_BOOKS).fill(1);
  let left = TOTAL_COVERS - TOTAL_BOOKS;
  while (left > 0) {
    const i = Math.floor(Math.random() * TOTAL_BOOKS);
    if (counts[i] < 3) {
      counts[i]++;
      left--;
    }
  }
  return shuffle(counts);
}

export const seedBooks = async () => {
  const [authors, genres, languages, files] = await Promise.all([
    Author.findAll({ attributes: ["id"] }),
    Genre.findAll({ attributes: ["id"] }),
    Language.findAll({ attributes: ["id"] }),
    File.findAll({ attributes: ["id"] }),
  ]);

  const authorIds = authors.map((a) => a.id);
  const genreIds = genres.map((g) => g.id);
  const languageIds = languages.map((l) => l.id);
  const fileIds = files.map((f) => f.id);

  if (!authorIds.length) throw new Error("Seed authors first.");
  if (!genreIds.length) throw new Error("Seed genres first.");
  if (fileIds.length < TOTAL_COVERS)
    throw new Error(`Seed at least ${TOTAL_COVERS} files first.`);

  const shuffledFileIds = shuffle(fileIds.slice(0, TOTAL_COVERS));
  const coversPerBook = coverCountsPerBook();
  const titles = generateTitles(TOTAL_BOOKS);
  const descriptions = generateDescriptions(TOTAL_BOOKS);

  let fileOffset = 0;

  for (let i = 1; i <= TOTAL_BOOKS; i++) {
    const languageId =
      languageIds.length && Math.random() > 0.3
        ? (languageIds[Math.floor(Math.random() * languageIds.length)] ?? null)
        : null;

    const title = titles[i - 1] ?? `Book ${i}`;
    const description = descriptions[i - 1] ?? `Description for ${title}.`;
    const book = await Book.create({
      title,
      description,
      isbn: randomIsbn(),
      languageId: languageId ?? null,
    });

    for (const authorId of pickBetween(authorIds, 1, 3)) {
      await BookAuthor.create({ bookId: book.id, authorId });
    }
    for (const genreId of pickBetween(genreIds, 1, 3)) {
      await BookGenre.create({ bookId: book.id, genreId });
    }

    const numCovers = coversPerBook[i - 1] ?? 1;
    for (let c = 0; c < numCovers; c++) {
      const fileId = shuffledFileIds[fileOffset + c];
      if (fileId == null) break;
      await BookCover.create({
        bookId: book.id,
        fileId,
        isPrimary: c === 0,
      });
    }
    fileOffset += numCovers;

    console.log(`Seeded book ${i}/${TOTAL_BOOKS}: ${title}`);
  }

  console.log(`Seeded ${TOTAL_BOOKS} books.`);
};
