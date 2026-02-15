import cron from "node-cron";
import Reminder from "../models/Reminder.js";
import User from "../models/User.js";
import { sendEmail } from "./sendEmail.js";

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // HH:mm

  const reminders = await Reminder.find({
    time: currentTime,
    isActive: true,
  }).populate("userId");

  for (const r of reminders) {
    console.log(`🔔 Reminder: Take ${r.medicineName}`);

    // 📧 SEND EMAIL
    if (r.userId?.email) {
      await sendEmail({
        to: r.userId.email,
        subject: "💊 Medicine Reminder",
        text: `
Hello ${r.userId.name || "User"},

This is your medicine reminder.

Medicine: ${r.medicineName}
Dosage: ${r.dosage || "As prescribed"}
Time: ${r.time}

Please take your medicine on time.

– MediSakhi 💙
        `,
      });
    }
  }
});
