import express, { type Application } from "express";
import { rootRouter } from "@routes/root.js";
import { impRouter } from "@routes/imp.js";

export const app: Application = express();
export const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", rootRouter);
app.use("/", impRouter);
