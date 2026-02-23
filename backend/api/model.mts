import { Collection, MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

// load root .env
dotenv.config({
  path: process.env.ENV_PATH,
});

type Novel = {
  __author: string;
  __title: string;
  __chapters: Chapter[];
};

type Chapter = {
  __num: number;
  __title: string;
  __content: string;
};

let users;
let novels: Collection<Novel>;

const MONGO_URL = process.env.MONGO_URL;

async function runGetStarted() {
  const client = new MongoClient(MONGO_URL!);
  await client.connect();
  const db = client.db("transverra");
  users = db.collection("users");
  novels = db.collection("novels");
}

runGetStarted().catch(console.dir);

export async function insertNovel(novel: Novel) {
  const res = await novels.insertOne(novel);
  return res;
}

export async function getNovel(id: string) {
  const res = await novels.findOne({
    _id: new ObjectId(id),
  });
  return res;
}
