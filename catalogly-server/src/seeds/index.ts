import "../modules/files/file.model.js";
import { DatabaseService } from "../services/database.service.js";
import { seedAdmin } from "./seed-admin.js";
import { seedAuthors } from "./seed-authors.js";
import { seedBooks } from "./seed-books.js";
import { seedFiles } from "./seed-files.js";
import { seedGenres } from "./seed-genres.js";
import { seedLanguages } from "./seed-languages.js";
import { seedRoles } from "./seed-roles.js";

const run = async () => {
  try {
    const databaseService = new DatabaseService();
    await databaseService.initialize();

    await seedRoles();
    await seedAdmin();
    await seedGenres();
    await seedLanguages();
    await seedAuthors();
    await seedFiles();
    await seedBooks();

    console.log("All seeds completed.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

run();
