import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { extracto, pregunta } = req.body;

  const prompt = `
Actúa como asesor financiero. Aquí tienes un extracto bancario:

${extracto}

Pregunta del usuario: "${pregunta}"

Responde con claridad, resumen e ideas útiles.
  `;

  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not defined");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const respuesta = completion.choices[0].message.content;
    res.status(200).json({ respuesta });

  } catch (error) {
    console.error("ERROR DETECTADO:", error);
    res.status(500).json({
      error: error.message || "Error interno",
      detalles: error,
    });
  }
}


