import type { Request, Response } from "express";
import { HTTP_CREATED } from "../../constants/httpCodes.js";
import { BadRequestError } from "../../utils/errors.js";
import { ApiResponse } from "../../utils/response.js";
import { FileService } from "./file.service.js";

const fileService = new FileService();

export class FileController {
  async getPresignedUploadUrl(req: Request, res: Response) {
    const { contentType, folder } = req.body;

    const contentTypeTrimmed = contentType?.trim();
    const folderTrimmed = folder?.trim();
    if (!contentTypeTrimmed) {
      throw new BadRequestError("Content type is required");
    }
    if (!folderTrimmed) {
      throw new BadRequestError("Folder is required");
    }

    const result = await fileService.getPresignedUpload(
      contentTypeTrimmed,
      folderTrimmed
    );
    return ApiResponse.success(res, result, HTTP_CREATED);
  }
}
