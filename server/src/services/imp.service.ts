import { ImpModel, type Imp } from "@models/imp.model.js";

export const getAllImps = () => ImpModel.find({});
export const getImpByName = (name: string) => ImpModel.findOne({ name });

export const createImp = (data: Imp) => ImpModel.create(data);

export const createImpsByCount = async (count: number) => {
  if (count < 1) {
    return;
  }

  const newImps = Array.from({ length: count }, (_, i) => ({ name: `Imp-${i + 1}` }));
  await ImpModel.insertMany(newImps);
};
