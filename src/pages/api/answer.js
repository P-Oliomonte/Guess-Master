import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function extractNumericValue(answer) {
  const match = String(answer).match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
}

function calculateRanks(players, correctAnswer) {
  const numericRightAnswer = extractNumericValue(correctAnswer);

  if (numericRightAnswer === null) {
    throw new Error(
      "Correct answer does not contain a valid numeric value."
    );
  }

  const rankedPlayers = players.map((player) => {
    const numericPlayerAnswer = extractNumericValue(
      player.playerAnswer
    );

    if (numericPlayerAnswer === null) {
      throw new Error(
        `Player answer "${player.playerAnswer}" is not a valid number.`
      );
    }

    return {
      ...player,
      absoluteDifference: Math.abs(
        numericPlayerAnswer - numericRightAnswer
      ),
    };
  });

  rankedPlayers.sort(
    (a, b) => a.absoluteDifference - b.absoluteDifference
  );

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

  return rankedPlayers.map(
    ({ absoluteDifference, ...player }) => player
  );
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Only POST requests are allowed",
    });
  }

  const data = req.body;

  if (!data) {
    return res.status(400).json({
      message: "Missing data",
    });
  }

  try {
    const aiResponse = await openai.responses.create({
      model: "gpt-5.4",

      instructions: `
You are an accurate fact-checking assistant and witty game show host.

Rules:

1. Keep the question unchanged.
2. Determine the correct answer as a single precise value.
3. Include units where applicable.
4. Never return a range.
5. Write a concise explanation (max 1000 characters).
6. Explain how the answer was determined.
7. Mention the winner(s) based on the closest guess.
8. Lightheartedly tease the worst guess without being rude.
9. Return only valid JSON matching the schema.
      `,

      text: {
        format: {
          type: "json_schema",
          name: "game_result",
          schema: {
            type: "object",
            properties: {
              answer: {
                type: "string",
              },
              explanation: {
                type: "string",
              },
            },
            required: ["answer", "explanation"],
            additionalProperties: false,
          },
        },
      },

      input: `
Question:
${data.question}

Players:
${JSON.stringify(data.players)}
      `,
    });

    const result = JSON.parse(aiResponse.output_text);

    const rankedPlayers = calculateRanks(
      data.players,
      result.answer
    );

    const finalResponse = {
      question: data.question,
      answer: result.answer,
      explanation: result.explanation,
      players: rankedPlayers,
    };

    return res.status(200).json(finalResponse);
  } catch (error) {
    console.error("Error generating answer:", error);

    return res.status(500).json({
      message: "Error generating answer",
      error: error.message,
    });
  }
}