import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import { sequelize } from "../../config/db.js";
import { Book } from "../books/book.model.js";
import { Genre } from "../genres/genre.model.js";

interface BookGenreAttributes {
  id: number;
  bookId: number;
  genreId: number;
}

interface BookGenreCreationAttributes extends Optional<BookGenreAttributes, "id"> {}

export class BookGenre
  extends Model<BookGenreAttributes, BookGenreCreationAttributes>
  implements BookGenreAttributes
{
  declare id: number;
  declare bookId: number;
  declare genreId: number;
}

BookGenre.init(
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
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Genre,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "book_genres",
    timestamps: false,
  },
);

Book.belongsToMany(Genre, { through: BookGenre, foreignKey: "bookId", as: "genres" });
Genre.belongsToMany(Book, { through: BookGenre, foreignKey: "genreId", as: "books" });
