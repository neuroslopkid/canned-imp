import type { Request, Response } from "express";
import { createImpsByCount, getAllImps, getImpByName } from "@services/imp.service.js";

export const listImps = async (_req: Request, res: Response) => {
  const imps = await getAllImps();
  res.json(imps);
};

export const getImp = async (req: Request<{ name: string }>, res: Response) => {
  const { name } = req.params;

  if (!name) {
    res.status(400).json({ error: "Missing name" });

    return;
  }

  const imp = await getImpByName(name);

  if (!imp) {
    res.status(404).json({ error: `Not found imp with name "${name}"` });

    return;
  }

  res.json(imp);
};

export const createImps = async (req: Request, res: Response) => {
  if (!req.body) {
    return;
  }

  const { count } = req.body as { count?: number };

  if (!count) {
    return;
  }

  await createImpsByCount(count);

  res.status(201).json({ ok: true });
};
