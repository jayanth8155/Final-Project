import express from "express";
import Workout from "../models/Workout.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create a new workout
router.post("/", auth, async (req, res) => {
  try {
    const workout = new Workout({ ...req.body, user: req.userId });
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: "Error creating workout" });
  }
});

// Get all workouts for a user
router.get("/", auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.userId }).sort({
      date: -1,
    });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workouts" });
  }
});

// Update a workout
router.put("/:id", auth, async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: "Error updating workout" });
  }
});

// Delete a workout
router.delete("/:id", auth, async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting workout" });
  }
});

export default router;
