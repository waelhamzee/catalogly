import { Router } from "express";
import { authenticate, authorizeAdmin } from "../../middlewares/auth.js";
import { FileController } from "./file.controller.js";

const router = Router();
const fileController = new FileController();

router.post(
  "/presigned-upload",
  authenticate,
  authorizeAdmin(),
  fileController.getPresignedUploadUrl
);

export default router;
