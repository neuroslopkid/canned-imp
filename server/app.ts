import express, { type Application } from "express";
import { rootRouter } from "@routes/root.js";

export const app: Application = express();
export const PORT = process.env.PORT || 3000;

app.use("/", rootRouter);
