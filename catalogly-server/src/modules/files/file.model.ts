import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import { sequelize } from "../../config/db.js";

interface FileAttributes {
  id: number;
  fileName: string;
  bucket: string;
  key: string;
  contentType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FileCreationAttributes extends Optional<FileAttributes, "id" | "createdAt" | "updatedAt"> {}

export class File
  extends Model<FileAttributes, FileCreationAttributes>
  implements FileAttributes
{
  declare id: number;
  declare fileName: string;
  declare bucket: string;
  declare key: string;
  declare contentType: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

File.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fileName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    bucket: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    contentType: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "files",
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  },
);
