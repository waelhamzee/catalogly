import { config } from "dotenv";

config();

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: parseInt(process.env.PORT ?? "8080", 10),

  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_PORT: parseInt(process.env.DB_PORT ?? "5432", 10),
  DB_NAME: process.env.DB_NAME ?? "catalogly",
  DB_USER: process.env.DB_USER ?? "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "postgres",

  JWT_SECRET: process.env.JWT_SECRET ?? "change-in-production",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "3600",

  CLIENT_URL: process.env.CLIENT_URL ?? "http://localhost:5173",

  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY ?? "32-character-encryption-key-123",

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? "",
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  AWS_REGION: process.env.AWS_REGION ?? "eu-central-1",
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET ?? "",
};
