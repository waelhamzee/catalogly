import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from "../../config/db.js";
import { Role } from "../roles/role.model.js";
import { decrypt, encrypt } from "../../utils/crypto.js";
import { validatePassword } from "../../utils/password.js";

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare roleId: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare role: Role;

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  public getDecryptedData() {
    return {
      id: this.id,
      firstName: decrypt(this.firstName),
      lastName: decrypt(this.lastName),
      email: decrypt(this.email),
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(500),
      allowNull: false,
      set(value: string) {
        this.setDataValue("firstName", encrypt(value));
      },
    },
    lastName: {
      type: DataTypes.STRING(500),
      allowNull: false,
      set(value: string) {
        this.setDataValue("lastName", encrypt(value));
      },
    },
    email: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true,
      set(value: string) {
        this.setDataValue("email", encrypt(value.toLowerCase()));
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          validatePassword(user.password);
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.changed("password")) {
          validatePassword(user.password);
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
Role.hasMany(User, { foreignKey: "roleId", as: "users" });
