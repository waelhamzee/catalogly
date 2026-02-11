import { sequelize } from "../config/db.js";
import { env } from "../config/env.js";

export class DatabaseService {
  async connect() {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  }

  async sync() {
    await sequelize.sync({ alter: true });
  }

  async disconnect() {
    await sequelize.close();
  }

  async initialize() {
    await this.connect();
    if (env.NODE_ENV === "development") {
      await this.sync();
    }
  }
}
