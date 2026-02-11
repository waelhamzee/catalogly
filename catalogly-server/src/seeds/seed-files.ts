import { randomUUID } from "crypto";
import { env } from "../config/env.js";
import { BucketService } from "../modules/files/bucket.service.js";
import { File } from "../modules/files/file.model.js";

const PICSUM_BASE = "https://picsum.photos";
const WIDTH = 400;
const HEIGHT = 600;
const TOTAL_FILES = 500;
const S3_PREFIX = "covers";

const bucketService = new BucketService();

const CONTENT_TYPE_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};

function getExtension(contentType: string): string {
  return (
    CONTENT_TYPE_TO_EXT[contentType.toLowerCase()] ??
    contentType.split("/")[1]?.split(";")[0]?.trim() ??
    "jpg"
  );
}

async function fetchImage(
  url: string,
): Promise<{ buffer: ArrayBuffer; contentType: string }> {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  const contentType =
    res.headers.get("content-type")?.split(";")[0]?.trim() ?? "image/jpeg";
  const arrayBuffer = await res.arrayBuffer();
  return { buffer: arrayBuffer, contentType };
}

export const seedFiles = async () => {
  const bucket = env.AWS_S3_BUCKET;
  if (!bucket) {
    throw new Error("AWS_S3_BUCKET is not set");
  }

  for (let i = 0; i < TOTAL_FILES; i++) {
    const url = `${PICSUM_BASE}/seed/${i}/${WIDTH}/${HEIGHT}.jpg`;
    const { buffer: arrayBuffer, contentType } = await fetchImage(url);
    const ext = getExtension(contentType);
    const key = `${S3_PREFIX}/${randomUUID()}.${ext}`;
    const buffer = Buffer.from(arrayBuffer);

    await bucketService.upload(bucket, key, buffer, contentType);
    await File.create({
      bucket,
      key,
      fileName: `cover-${i + 1}.${ext}`,
      contentType,
    });

    console.log(`Seeded file ${i + 1}/${TOTAL_FILES}: ${key}`);
  }

  console.log(`Seeded ${TOTAL_FILES} files to S3 and database.`);
};
