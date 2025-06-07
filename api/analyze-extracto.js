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
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const respuesta = completion.choices[0].message.content;
    res.status(200).json({ respuesta });
  } catch (error) {
    res.status(500).json({ error: "Error al procesar la petición" });
  }
}
