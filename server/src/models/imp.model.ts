import mongoose, { Model, Schema } from "mongoose";

export type Imp = {
  name: string;
};

export type ImpMethods = {};

const ImpSchema = new Schema<Imp, Model<Imp>, ImpMethods>({
  name: String,
});

export const ImpModel = mongoose.model("Imp", ImpSchema);
