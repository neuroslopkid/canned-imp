import { createImps, getImp, listImps } from "@controllers/imp.controller.js";
import { requireAdmin } from "@middleware/require-admin.middleware.js";
import { Router } from "express";

export const impRouter = Router();
// impRouter.use(requireAdmin);

impRouter.get("/imp", listImps);
impRouter.get("/imp/:name", requireAdmin, getImp);
impRouter.post("/imp", createImps);

// impRouter.patch("/imp", "controller");
// impRouter.delete("/imp", "controller");
