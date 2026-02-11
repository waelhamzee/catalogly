import { env } from "../../config/env.js";
import { BadRequestError } from "../../utils/errors.js";
import { BucketService } from "../files/bucket.service.js";
import { File } from "../files/file.model.js";
import type { CreateBookCoverInput } from "../books/book.types.js";
import { BookCover } from "./book-cover.model.js";

const bucketService = new BucketService();

export class BookCoverService {
  async createCovers(
    bookId: number,
    covers: CreateBookCoverInput[],
  ): Promise<void> {
    if (covers.length === 0) return;

    const bucket = env.AWS_S3_BUCKET;
    if (!bucket) {
      throw new BadRequestError("File storage is not configured");
    }

    const files = await Promise.all(
      covers.map((c) =>
        File.create({
          bucket,
          key: c.key,
          fileName: c.fileName,
          contentType: c.contentType,
        }),
      ),
    );

    await Promise.all(
      files.map((file, i) => {
        const cover = covers[i];
        return BookCover.create({
          bookId,
          fileId: file.id,
          isPrimary: cover?.isPrimary ?? false,
        });
      }),
    );
  }

  async deleteCoversForBook(bookId: number): Promise<void> {
    const bookCovers = await BookCover.findAll({
      where: { bookId },
      include: [
        {
          model: File,
          as: "file",
          attributes: ["id", "key", "bucket"],
        },
      ],
    });

    const files = bookCovers
      .map((bc) => (bc as BookCover & { file?: File }).file)
      .filter((f): f is File => Boolean(f));

    for (const file of files) {
      try {
        await bucketService.delete(file.key, file.bucket);
      } catch (err) {
        console.error(`Failed to delete S3 object ${file.key}:`, err);
      }
    }

    await BookCover.destroy({ where: { bookId } });
    const fileIds = files.map((f) => f.id);
    if (fileIds.length > 0) {
      await File.destroy({ where: { id: fileIds } });
    }
  }

  async deleteCoversByIds(coverIds: number[]): Promise<void> {
    if (coverIds.length === 0) return;

    const bookCovers = await BookCover.findAll({
      where: { id: coverIds },
      include: [
        {
          model: File,
          as: "file",
          attributes: ["id", "key", "bucket"],
        },
      ],
    });

    const files = bookCovers
      .map((bc) => (bc as BookCover & { file?: File }).file)
      .filter((f): f is File => Boolean(f));

    for (const file of files) {
      try {
        await bucketService.delete(file.key, file.bucket);
      } catch (err) {
        console.error(`Failed to delete S3 object ${file.key}:`, err);
      }
    }

    await BookCover.destroy({ where: { id: coverIds } });
    const fileIds = files.map((f) => f.id);
    if (fileIds.length > 0) {
      await File.destroy({ where: { id: fileIds } });
    }
  }

  async updateCoverIsPrimary(id: number, isPrimary: boolean): Promise<void> {
    await BookCover.update({ isPrimary }, { where: { id } });
  }
}
