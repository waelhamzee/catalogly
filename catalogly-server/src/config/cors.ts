import type { CorsOptions } from "cors";
import { env } from "./env.js";

export const corsOptions: CorsOptions = {
  origin: ["http://localhost:5173", "https://catalogly.live"],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
