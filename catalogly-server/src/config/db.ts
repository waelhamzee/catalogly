import cls from "cls-hooked";
import { Sequelize } from "sequelize";
import { env } from "./env.js";

const namespace = cls.createNamespace("sequelize-transaction");
Sequelize.useCLS(namespace);

export const sequelize = new Sequelize({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  dialect: "postgres",
  logging: env.NODE_ENV === "development" ? false : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
