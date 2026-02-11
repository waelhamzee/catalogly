import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { corsOptions } from "./config/cors.js";
import { DatabaseService } from "./services/database.service.js";
import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { setupSwagger } from "./swagger/index.js";
import authRoutes from "./modules/auth/auth.routes.js";
import authorRoutes from "./modules/authors/author.routes.js";
import bookRoutes from "./modules/books/book.routes.js";
import fileRoutes from "./modules/files/file.routes.js";
import genreRoutes from "./modules/genres/genre.routes.js";
import languageRoutes from "./modules/languages/language.routes.js";
import userRoutes from "./modules/users/user.routes.js";

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Book Library API is running!"));

setupSwagger(app);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api/authors", authorRoutes);

app.use(errorHandler);

const databaseService = new DatabaseService();

const startServer = async () => {
  try {
    await databaseService.initialize();
    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
