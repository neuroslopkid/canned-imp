import { getRoot } from "@controllers/root.controller.js";
import { Router } from "express";

export const rootRouter = Router();

rootRouter.get("/", (_req, res) => {
  res.json(getRoot());
});
