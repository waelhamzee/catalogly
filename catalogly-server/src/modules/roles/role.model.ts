import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import { sequelize } from "../../config/db.js";

interface RoleAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RoleCreationAttributes extends Optional<
  RoleAttributes,
  "id" | "createdAt" | "updatedAt"
> {}

export class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  declare id: number;
  declare name: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Role.init(
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
    tableName: "roles",
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  },
);
