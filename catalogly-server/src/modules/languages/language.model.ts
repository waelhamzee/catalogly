import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import { sequelize } from "../../config/db.js";

interface LanguageAttributes {
  id: number;
  name: string;
}

interface LanguageCreationAttributes extends Optional<
  LanguageAttributes,
  "id"
> {}

export class Language
  extends Model<LanguageAttributes, LanguageCreationAttributes>
  implements LanguageAttributes
{
  declare id: number;
  declare name: string;
}

Language.init(
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
    tableName: "languages",
    timestamps: false,
  },
);
