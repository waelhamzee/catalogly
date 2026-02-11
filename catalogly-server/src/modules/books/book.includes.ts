import type { Includeable } from "sequelize";
import { Author } from "../authors/author.model.js";
import { BookCover } from "../book-covers/book-cover.model.js";
import { File } from "../files/file.model.js";
import { Genre } from "../genres/genre.model.js";
import { Language } from "../languages/language.model.js";

export const LIST_BOOKS_INCLUDE: Includeable[] = [
  {
    model: Author,
    as: "authors",
    attributes: ["id", "name"],
    through: { attributes: [] },
    required: false,
  },
  {
    model: Genre,
    as: "genres",
    attributes: ["id", "name"],
    through: { attributes: [] },
    required: false,
  },
  {
    model: BookCover,
    as: "covers",
    attributes: ["id", "isPrimary"],
    include: [
      {
        model: File,
        as: "file",
        attributes: ["key", "fileName", "contentType"],
      },
    ],
    required: false,
  },
  {
    model: Language,
    as: "language",
    attributes: ["id", "name"],
    required: false,
  },
];
