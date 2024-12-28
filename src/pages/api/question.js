import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(request, response) {
  if (request.method !== "GET") {
    return response
      .status(405)
      .json({ message: "Only GET requests are allowed" });
  }

  try {
    const prompt = `
    You are a creative game show writer generating unique, diverse and creative guessing questions for a game.
    The questions must:
    - Not be a Yes or No question.
    - Start phrases like "How many..." or "How much..." or "How long..." etc. but vary between those and other phrases.
    - Include the unit of measurement if applicable in the question.
    - Be about interesting or surprising quantities or measurements.    
    
    Your response must:
    - Be a single question as a string in valid JSON format (e.g. "The response is supposed to be a string like this" but never exactly this).
    - Contain no additional text, explanations, or formatting such as \`\`\`json.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful, very crative assistant and talented game show writer.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 100,
      temperature: 2,
      top_p: 0.9,
      presence_penalty: 2,
    });

    const content = completion.choices[0].message.content
      .trim()
      .replace(/^```json|```$/g, "");

    const question = JSON.parse(content);

    response.status(200).json(question);
  } catch (error) {
    console.error("Error generating question:", error);
    response.status(500).json({ message: "Error generating question", error });
  }
}
