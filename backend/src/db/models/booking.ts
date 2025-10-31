import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  totalPrice: Number,
  promoCode: String,
  status: { type: String, default: "confirmed" }, // or "failed"
});

export default mongoose.model("Booking", bookingSchema);
