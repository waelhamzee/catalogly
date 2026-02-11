import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import { sequelize } from "../../config/db.js";
import { Book } from "../books/book.model.js";
import { Author } from "../authors/author.model.js";

interface BookAuthorAttributes {
  id: number;
  bookId: number;
  authorId: number;
}

interface BookAuthorCreationAttributes extends Optional<BookAuthorAttributes, "id"> {}

export class BookAuthor
  extends Model<BookAuthorAttributes, BookAuthorCreationAttributes>
  implements BookAuthorAttributes
{
  declare id: number;
  declare bookId: number;
  declare authorId: number;
}

BookAuthor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book,
        key: "id",
      },
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Author,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "book_authors",
    timestamps: false,
  },
);

Book.belongsToMany(Author, { through: BookAuthor, foreignKey: "bookId", as: "authors" });
Author.belongsToMany(Book, { through: BookAuthor, foreignKey: "authorId", as: "books" });
