import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import { sequelize } from "../../config/db.js";

interface GenreAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface GenreCreationAttributes extends Optional<
  GenreAttributes,
  "id" | "createdAt" | "updatedAt"
> {}

export class Genre
  extends Model<GenreAttributes, GenreCreationAttributes>
  implements GenreAttributes
{
  declare id: number;
  declare name: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Genre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "genres",
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  },
);
