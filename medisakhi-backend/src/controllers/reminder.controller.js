import Reminder from "../models/Reminder.js";

// Create reminder
export const createReminder = async (req, res) => {
  try {
    const reminder = await Reminder.create({
      ...req.body,
      userId: req.user.id, // from auth middleware
    });
    res.status(201).json(reminder);
  } catch (err) {
    res.status(500).json({ error: "Failed to create reminder" });
  }
};

// Get user reminders
export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({
      userId: req.user.id,
      isActive: true,
    });
    res.json(reminders);
  } catch {
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
};

// Delete reminder
export const deleteReminder = async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ message: "Reminder deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete reminder" });
  }
};
