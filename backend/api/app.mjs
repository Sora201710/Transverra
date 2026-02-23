import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";
import { insertNovel, getNovel } from "./model.mts";

// load root .env
dotenv.config({
  path: process.env.ENV_PATH,
});

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_HOST, process.env.VITE_TRANSLATE_API_URL],
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json({ limit: "50mb" }));

/**
 *
 */
app.post("/api/upload_novel", async (req, res) => {
  const result = await insertNovel(req.body);
  res.json(result);
});

// TODO: add error handling
app.get("/api/get_novel/:novelId", async (req, res) => {
  const result = await getNovel(req.params.novelId);
  res.json(result);
});

app.listen(process.env.API_PORT, () => {
  console.log(
    `Transverra API hosted on: ${process.env.API_HOST}:${process.env.API_PORT}`,
  );
});
