import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGODB_URL;
const authSecret = process.env.BETTER_AUTH_SECRET;
const vercelProductionOrigin = "https://p-h-assignment-07-5z4z.vercel.app";
const isVercelProduction = process.env.VERCEL_ENV === "production";
const authBaseURL = isVercelProduction
  ? vercelProductionOrigin
  : process.env.BETTER_AUTH_URL;

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
  baseURL: authBaseURL,
  trustedOrigins: [authBaseURL].filter(
    (origin): origin is string => Boolean(origin),
  ),
  emailAndPassword: {
    enabled:true,
  },
  socialProviders:{
    google:{
      clientId:process.env.GOOGLE_CLIENT_ID as string,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
    }
  },
  database: mongodbAdapter(db, {
    client,
  }),
});