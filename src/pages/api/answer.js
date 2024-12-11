import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response
      .status(405)
      .json({ message: "Only POST requests are allowed" });
  }

  const data = request.body;

  if (!data) {
    return response.status(400).json({ message: "Missing data" });
  }

  const prompt = `
  You are a game show host. Given the following game data, respond as follows:
  - The "question" key must remain unchanged.
  - Replace the "answer" key with a string providing the correct answer (a single value with units, if applicable).
  - Replace the "explanation" key with a concise explanation (no more than 500 characters) that includes who won the round, why, and optionally a humorous remark about the worst player.
  - Replace the "players" key, maintaining the playerId, playerName, and playerAnswer. Update "playerRank" based on the accuracy of each player's answer (1 = best, higher numbers for worse answers).
  
  Input Data:
  ${JSON.stringify(data)}
  
  Output the response in valid JSON format. Ensure no additional information or formatting is included.
    `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful and accurate assistant.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content
      .trim()
      .replace(/^```json|```$/g, "");

    const answer = JSON.parse(content);

    response.status(200).json(answer);
  } catch (error) {
    console.error("Error generating answer:", error);
    response.status(500).json({ message: "Error generating answer", error });
  }
}
