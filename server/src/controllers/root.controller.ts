import { getRootMessage } from "@services/root.service.js";
import type { RootResponse } from "./root.type.js";

export const getRoot = (): RootResponse => {
  return { message: getRootMessage() };
};
