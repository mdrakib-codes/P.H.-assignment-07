import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGODB_URL;
const authSecret = process.env.BETTER_AUTH_SECRET;

if (!mongoUrl) {
  throw new Error("MONGODB_URL must be configured to use authentication.");
}

if (!authSecret) {
  throw new Error("BETTER_AUTH_SECRET must be configured to use authentication.");
}

const client = new MongoClient(mongoUrl);
const db = client.db("bazar-dor");

export const auth = betterAuth({
  secret: authSecret,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled:true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
});