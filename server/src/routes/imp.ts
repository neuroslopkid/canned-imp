import { createImps, getImp, listImps } from "@controllers/imp.controller.js";
import { Router } from "express";

export const impRouter = Router();

impRouter.get("/imp", listImps);
impRouter.get("/imp/:name", getImp);
impRouter.post("/imp", createImps);

// impRouter.patch("/imp", "controller");
// impRouter.delete("/imp", "controller");
