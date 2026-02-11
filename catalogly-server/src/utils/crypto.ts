import crypto from "crypto";
import { env } from "../config/env.js";

const ALGORITHM = "aes-256-cbc";
const KEY = crypto.scryptSync(env.ENCRYPTION_KEY, "salt", 32);
const IV_LENGTH = 16;

export const encrypt = (text: string): string => {
  const iv = crypto.createHash("sha256").update(text + env.ENCRYPTION_KEY).digest().subarray(0, IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

export const decrypt = (text: string): string => {
  const parts = text.split(":");
  const iv = Buffer.from(parts[0]!, "hex");
  const encryptedText = parts[1]!;
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
