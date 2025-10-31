import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ["PERCENT", "FLAT"], required: true },
  value: { type: Number, required: true },
});

export default mongoose.model("Promo", promoSchema);
