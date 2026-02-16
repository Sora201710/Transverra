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
let users;
let novels;

const MONGO_URL = process.env.MONGO_URL;
async function runGetStarted() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  const db = client.db("transverra");
  users = db.collection("users");
  novels = db.collection("novels");
}
runGetStarted()
  .then(() => {
    app.listen(process.env.API_PORT, () => {
      console.log(
        `Transverra API hosted on: ${process.env.API_HOST}:${process.env.API_PORT}`,
      );
    });
  })
  .catch(console.dir);

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

app.use(express.json({ limit: "50mb" }));

/**
 *
 */
app.post("/api/upload_novel", async (req, res) => {
  const result = await novels.insertOne(req.body);
  res.json(result);
});

// TODO: implement this
app.get("/api/get_novel", async (req, res) => {
  const result = await novels.findOne({ _id: new ObjectId(req.query.id) });
  res.json(result);
});
