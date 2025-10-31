import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  available: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["available", "sold out"],
    default: "available",
  },
});


const dateSchema = new mongoose.Schema({
  date: String, // e.g., "2025-11-01"
  slots: [slotSchema],
});

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: String,
  description: String,
  price: { type: Number, required: true },
  image: String,
  availableDates: [dateSchema],
  about : String
});

export default mongoose.model("Experience", experienceSchema);
