import { randomUUID } from "crypto";
import { BucketService } from "./bucket.service.js";
import { File } from "./file.model.js";
import { NotFoundError } from "../../utils/errors.js";

const bucketService = new BucketService();

export interface PresignedUploadResult {
  uploadUrl: string;
  key: string;
}

export class FileService {
  async getPresignedUpload(
    contentType: string,
    folder: string
  ): Promise<PresignedUploadResult> {
    const ext = contentType.split("/")[1] ?? "bin";
    const key = `${folder}/${randomUUID()}.${ext}`;
    const uploadUrl = await bucketService.getPresignedUploadUrl(key, contentType);
    return { uploadUrl, key };
  }

  async delete(id: number) {
    const file = await File.findByPk(id);
    if (!file) {
      throw new NotFoundError("File not found");
    }

    await bucketService.delete(file.key, file.bucket);
    await file.destroy();

    return { message: "File deleted successfully" };
  }
}
