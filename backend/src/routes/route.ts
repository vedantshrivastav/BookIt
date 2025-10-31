import express from 'express'
import Experience from '../db/models/experience'

const router = express.Router()
const promoCodes :  Record<string, { discountType: string; discountValue: number }> = {
  SAVE10: { discountType: "percentage", discountValue: 10 },
  FLAT100: { discountType: "flat", discountValue: 100 },
}

/**
 * @route   GET /api/experiences
 * @desc    Get all experiences
 */
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Error fetching experiences", error });
  }
});

/**
 * @route   GET /api/experiences/:id
 * @desc    Get single experience by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({ message: "Error fetching experience", error });
  }
});

/**
 * @route   PUT /api/experiences/:id/book
 * @desc    Book a slot and update availability
 */
router.put("/:id/book", async (req, res) => {
  try {
    console.log("the id recieved is",req.params.id)
    const { date, time } = req.body; // user sends date & time of booking
    console.log("this is the date and time",date,time)
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    const selectedDate = experience.availableDates.find(
      (d) => d.date === date
    );
    console.log(experience.availableDates)
    if (!selectedDate) {
      return res.status(404).json({ message: "Date not available" });
    }

    const slot = selectedDate.slots.find((s) => s.time === time);
    if (!slot) {
      return res.status(404).json({ message: "Time slot not found" });
    }

    if (slot.available === 0) {
      return res.status(400).json({ message: "Slot already sold out" });
    }

    slot.available -= 1;
    if (slot.available === 0) {
      slot.status = "sold out";
    }

    await experience.save();
    res.status(200).json({ message: "Booking successful", experience });
  } catch (error) {
    res.status(500).json({ message: "Error booking slot", error });
  }
});

router.post("/promo/validate", (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ valid: false, message: "Promo code is required." });
  }

  const promo = promoCodes[code.toUpperCase()];

  if (!promo) {
    return res.status(200).json({ valid: false, message: "Invalid promo code." });
  }

  // Promo code found — return details
  return res.status(200).json({
    valid: true,
    discountType: promo.discountType,
    discountValue: promo.discountValue,
  });
})

export default router;
