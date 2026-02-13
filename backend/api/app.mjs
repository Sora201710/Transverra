import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";

const app = express();

// load root .env

dotenv.config({
  path: process.env.ENV_PATH,
});

app.use(
  cors({
    origin: [process.env.FRONTEND_HOST, process.env.VITE_TRANSLATE_API_URL],
    optionsSuccessStatus: 200,
  }),
);

app.get("/", (req, res) => {
  res.send({
    message: "Hello World!",
  });
});

app.listen(process.env.API_PORT, () => {
  console.log(
    `Transvera API hosted on: ${process.env.API_HOST}:${process.env.API_PORT}`,
  );
});
