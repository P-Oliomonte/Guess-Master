import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Only GET requests are allowed",
    });
  }
  try {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      temperature: 1.8,
      instructions: `
You are a creative game show writer generating unique, diverse, and surprising guessing questions.
Rules:
- Never create yes/no questions.
- Vary question openings:
  - How many...
  - How much...
  - How long...
  - How far...
  - What percentage...
  - How heavy...
  - etc.
- Include units when relevant.
- Focus on surprising, interesting, or unusual quantities an topics.
- This is important: Return only valid JSON.
      `,

      text: {
        format: {
          type: "json_schema",
          name: "guessing_question",
          schema: {
            type: "object",
            properties: {
              question: {
                type: "string",
              },
            },
            required: ["question"],
            additionalProperties: false,
          },
        },
      },
      input: "Generate one guessing question.",
    });

    const result = JSON.parse(response.output_text);

    return res.status(200).json(result);

  } catch (error) {
    console.error("Error generating question:", error);
    return res.status(500).json({
      message: "Error generating question",
      error: error.message,
    });
  }
}