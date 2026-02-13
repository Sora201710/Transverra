import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config({ path: process.env.ENV_PATH });

// https://vite.dev/config/
export default defineConfig({
  server: {
    cors: {
      origin: [process.env.VITE_API_URL!, process.env.VITE_TRANSLATE_API_URL!],
      methods: ["GET", "POST"],
      credentials: true,
    },
  },
  plugins: [react()],
});
