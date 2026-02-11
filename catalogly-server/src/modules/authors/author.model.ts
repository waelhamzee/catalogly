import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import { sequelize } from "../../config/db.js";

interface AuthorAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AuthorCreationAttributes extends Optional<
  AuthorAttributes,
  "id" | "createdAt" | "updatedAt"
> {}

export class Author
  extends Model<AuthorAttributes, AuthorCreationAttributes>
  implements AuthorAttributes
{
  declare id: number;
  declare name: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize,
    tableName: "authors",
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  },
);
