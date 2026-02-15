import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzePrescription = async (req, res) => {
  try {
    // ✅ 1. Check file exists
    if (!req.file) {
      return res.status(400).json({ error: "Prescription file required" });
    }

    // ✅ 2. Read uploaded image
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString("base64");

    // ✅ 3. Send to OpenAI Vision
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a medical assistant helping patients understand prescriptions clearly and safely.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
Analyze this prescription and explain to the patient in SIMPLE language.

Return ONLY bullet points (no JSON, no markdown blocks).

Include:
• Medicines prescribed
• How to take each medicine
• When to take them (morning/night)
• Duration
• Important precautions
• When to consult the doctor again

Do NOT guess missing information.
`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });
    console.log( response.choices[0].message.content?.trim());

    // ✅ 4. Delete temp file
    fs.unlinkSync(req.file.path);

    // ✅ 5. Safe response (never empty)
    const text =
      response.choices[0].message.content?.trim() ||
      "Unable to clearly read the prescription. Please upload a clearer image.";

    // ✅ 6. Send to frontend
    res.json({ guidance: text });

  } catch (error) {
    console.error("Prescription analysis failed:", error);
    res.status(500).json({ error: "Failed to analyze prescription" });
  }
};
