import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import { sequelize } from "../../config/db.js";
import { Book } from "../books/book.model.js";
import { File } from "../files/file.model.js";

interface BookCoverAttributes {
  id: number;
  bookId: number;
  fileId: number;
  isPrimary: boolean;
}

interface BookCoverCreationAttributes extends Optional<BookCoverAttributes, "id"> {}

export class BookCover
  extends Model<BookCoverAttributes, BookCoverCreationAttributes>
  implements BookCoverAttributes
{
  declare id: number;
  declare bookId: number;
  declare fileId: number;
  declare isPrimary: boolean;
}

BookCover.init(
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
    fileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: File,
        key: "id",
      },
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "book_covers",
    timestamps: false,
  },
);

Book.hasMany(BookCover, { foreignKey: "bookId", as: "covers" });
BookCover.belongsTo(Book, { foreignKey: "bookId", as: "book" });
BookCover.belongsTo(File, { foreignKey: "fileId", as: "file" });
File.hasOne(BookCover, { foreignKey: "fileId", as: "bookCover" });
