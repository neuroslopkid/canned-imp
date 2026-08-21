import express, { type Application } from "express";
import cors from "cors";
import { expressMiddleware } from "@as-integrations/express5";
import { server } from "@src/apollo/index.js";
import { rootRouter } from "@routes/root.js";
import { impRouter } from "@routes/imp.js";

export const app: Application = express();
export const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/gql", cors(), express.json(), expressMiddleware(server));
app.use("/", rootRouter);
app.use("/", impRouter);
