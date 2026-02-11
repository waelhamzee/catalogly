import { GenreService } from "../modules/genres/genre.service.js";

const genreService = new GenreService();

const GENRES = [
  "Action & Adventure",
  "Biography & Memoir",
  "Children's Fiction",
  "Classic Literature",
  "Contemporary Fiction",
  "Cookbooks & Food",
  "Crime & Mystery",
  "Dystopian",
  "Education & Reference",
  "Essays & Anthologies",
  "Fantasy",
  "Graphic Novels & Manga",
  "History",
  "Horror",
  "Humor & Satire",
  "Literary Fiction",
  "Philosophy",
  "Poetry",
  "Psychology",
  "Romance",
  "Science Fiction",
  "Self-Help",
  "Short Stories",
  "Spirituality & Religion",
  "Thriller & Suspense",
  "Travel",
  "True Crime",
  "Young Adult (YA)",
];

export const seedGenres = async () => {
  for (const name of GENRES) {
    try {
      await genreService.createGenre(name);
      console.log(`Genre "${name}" created.`);
    } catch {
      console.log(`Genre "${name}" already exists, skipping.`);
    }
  }
};
