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
You are a game show host for a guessing game. Your task is to analyze the game data and respond as follows:

1. Keep the "question" key unchanged.
2. Replace the "answer" key with the correct answer as a precise single value with units (if applicable). Ensure the answer is accurate and not a range.
3. Replace the "explanation" key with a concise explanation (max 1000 characters):
   - Explain how you arrived at the correct answer.
   - Identify the winner(s) by finding the player(s) with the smallest absolute difference between their guess (playerAnswer) and the correct answer.
   - Mention the name(s) of the winner(s) and why they won.
   - Playfully make fun of the player(s) with the largest absolute difference, but keep it lighthearted.
4. Keep "players" unchanged. Do not calculate or mention "playerRank". Only provide the correct answer and explanation.

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
      top_p: 0.9,
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
