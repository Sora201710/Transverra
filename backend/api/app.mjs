import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";

const app = express();

// load root .env
dotenv.config({
  path: path.resolve(process.cwd(), "../../.env"),
});

app.use(
  cors({
    origin: process.env.FRONTEND_HOST,
    optionsSuccessStatus: 200,
  }),
);

app.get("/", (req, res) => {
  res.send({
    message: "Hello World!",
  });
});

// TODO: protect this endpoint so that only frontend or celery can send requests to this directly
// TODO: validate data

app.post("/api/translate", express.urlencoded(), (req, res) => {
  res.json({
    message: "received form data",
  });
  // takes in:
  // file (html for now)
  // source language
  // target language
  // novel source
});

app.listen(process.env.API_PORT, () => {
  console.log(
    `Transvera API hosted on: ${process.env.API_HOST}:${process.env.API_PORT}`,
  );
});
