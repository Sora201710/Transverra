import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();

// load root .env

dotenv.config({
  path: process.env.ENV_PATH,
});

const MONGO_URL = process.env.MONGO_URL;
async function runGetStarted() {
  const client = new MongoClient(MONGO_URL);
  try {
    const db = client.db("transverra");
    const usersCollection = db.collection("users");
    const novelsCollection = db.collection("novels");
  } finally {
    await client.close();
  }
}
runGetStarted().catch(console.dir);

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
