import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../config/s3.js";
import { env } from "../../config/env.js";

const PRESIGNED_UPLOAD_EXPIRES_IN = 600; // 10 minutes

export class BucketService {
  async getPresignedUploadUrl(
    key: string,
    contentType: string,
    expiresInSeconds = PRESIGNED_UPLOAD_EXPIRES_IN,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: key,
      ContentType: contentType,
    });
    return getSignedUrl(s3, command, { expiresIn: expiresInSeconds });
  }

  async delete(key: string, bucket?: string) {
    const b = bucket ?? env.AWS_S3_BUCKET;
    if (!b) return;
    await s3.send(
      new DeleteObjectCommand({
        Bucket: b,
        Key: key,
      }),
    );
  }

  async upload(
    bucket: string,
    key: string,
    body: Buffer,
    contentType: string,
  ): Promise<void> {
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
  }
}
