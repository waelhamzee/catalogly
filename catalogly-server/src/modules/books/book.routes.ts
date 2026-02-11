import { Router } from "express";
import { authenticate, authorizeAdmin } from "../../middlewares/auth.js";
import { BookController } from "./book.controller.js";

const router = Router();
const bookController = new BookController();

router.get("/", bookController.list);
router.get("/by-authors", bookController.getBooksByAuthors);
router.get("/:id", bookController.getById);

router.post(
  "/",
  authenticate,
  authorizeAdmin(),
  bookController.createUpdate,
);

router.delete(
  "/:id",
  authenticate,
  authorizeAdmin(),
  bookController.delete,
);

export default router;