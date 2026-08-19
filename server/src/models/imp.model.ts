import mongoose, { Model, Schema, type HydratedDocument } from "mongoose";

export type Imp = {
  name: string;
};

export type ImpMethods = {};

export const ImpSchema = new Schema<Imp, Model<Imp>, ImpMethods>({
  name: String,
});

export type ImpDoc = HydratedDocument<Imp>;

export const ImpModel = mongoose.model("Imp", ImpSchema);
