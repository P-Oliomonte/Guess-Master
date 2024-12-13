import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function extractNumericValue(answer) {
  const match = answer.match(/-?\d+(\.\d+)?/); // Regex to find a number
  return match ? parseFloat(match[0]) : null; // Convert to a number or return null if no match
}

function calculateRanks(players, correctAnswer) {
  const numericRightAnswer = extractNumericValue(correctAnswer);

  if (numericRightAnswer === null) {
    throw new Error("Correct answer does not contain a valid numeric value.");
  }

  // Calculate absolute differences
  const rankedPlayers = players.map((player) => {
    const numericPlayerAnswer = extractNumericValue(player.playerAnswer);

    if (numericPlayerAnswer === null) {
      throw new Error(
        `Player answer \"${player.playerAnswer}\" is not a valid number.`
      );
    }

    return {
      ...player,
      absoluteDifference: Math.abs(numericPlayerAnswer - numericRightAnswer),
    };
  });

  // Sort by absolute difference
  rankedPlayers.sort((a, b) => a.absoluteDifference - b.absoluteDifference);

  // Assign ranks
  let rank = 1;
  for (let i = 0; i < rankedPlayers.length; i++) {
    if (
      i > 0 &&
      rankedPlayers[i].absoluteDifference !==
        rankedPlayers[i - 1].absoluteDifference
    ) {
      rank = i + 1;
    }
    rankedPlayers[i].playerRank = rank;
  }

  // Remove temporary `absoluteDifference` field
  return rankedPlayers.map(({ absoluteDifference, ...player }) => player);
}

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
  - Replace the "explanation" key with a concise explanation of your reasoning (no more than 1200 characters). Say who is/are the winner/s and make fun of the worst guesser.

  Input Data:
  ${JSON.stringify(data)}
  
  Output the response in valid JSON format. Ensure no additional information or formatting is included.
    `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful, very accurate assistant and witty game show host.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content
      .trim()
      .replace(/^```json|```$/g, "");

    const aiResponse = JSON.parse(content);

    const rankedPlayers = calculateRanks(data.players, aiResponse.answer);

    const finalResponse = {
      question: data.question,
      answer: aiResponse.answer,
      explanation: aiResponse.explanation,
      players: rankedPlayers,
    };

    response.status(200).json(finalResponse);
  } catch (error) {
    console.error("Error generating answer:", error);
    response.status(500).json({ message: "Error generating answer", error });
  }
}
