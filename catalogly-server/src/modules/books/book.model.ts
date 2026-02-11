import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import { sequelize } from "../../config/db.js";
import { Language } from "../languages/language.model.js";

interface BookAttributes {
  id: number;
  title: string;
  description: string;
  isbn: string | null;
  languageId: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BookCreationAttributes extends Optional<
  BookAttributes,
  "id" | "createdAt" | "updatedAt" | "isbn" | "languageId"
> {}

export class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  declare id: number;
  declare title: string;
  declare description: string;
  declare isbn: string | null;
  declare languageId: number | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    languageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Language,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "books",
    timestamps: true,
  },
);

Book.belongsTo(Language, { foreignKey: "languageId", as: "language" });
