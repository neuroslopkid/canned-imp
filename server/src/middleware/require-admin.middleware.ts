import type { RequestHandler } from "express";

 
export const requireAdmin: RequestHandler = async (_req, res, next) => {
  const isAdmin = true; // TODO: real check

  if (!isAdmin) {
    res.status(403).json({ error: "Requires Admin role" });

    return;
  }

  next();
};
