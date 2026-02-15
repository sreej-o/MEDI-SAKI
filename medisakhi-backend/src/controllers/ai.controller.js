import OpenAI from "openai";
import Medicine from "../models/Medicine.js";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const mediGPT = async (req, res) => {
  try {
    const { message, medicineId } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    let medicineContext = "";

    if (medicineId) {
      const medicine = await Medicine.findById(medicineId);

      if (medicine) {
        medicineContext = `
Medicine Context:
Name: ${medicine.name}
Manufacturer: ${medicine.manufacturer}
Composition: ${medicine.composition1 || ""} ${medicine.composition2 || ""}
Use: ${medicine.use}
Dosage: ${medicine.dosage}
Price: ${medicine.price}
Precautions: ${medicine.precautions}
`;
      }
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are MediGPT, a medical assistant.

Rules:
- Use the provided medicine context if available
- Give clear, simple, structured answers
- Use bullet points and headings
- Do NOT give prescription-level advice
- Always include a medical disclaimer

${medicineContext}
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("MediGPT Error:", error.message);
    res.status(500).json({
      reply: "AI service failed. Please try again later.",
    });
  }
};
