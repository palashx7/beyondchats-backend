import dotenv from "dotenv";
dotenv.config();

export const config = {
  API_BASE_URL: process.env.API_BASE_URL,
  SERPER_API_KEY: process.env.SERPER_API_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

if (!config.API_BASE_URL) {
  throw new Error("❌ API_BASE_URL missing in .env");
}
