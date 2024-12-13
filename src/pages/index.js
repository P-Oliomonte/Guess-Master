import Head from "next/head";

import useLocalStorageState from "use-local-storage-state";
import StartScreen from "../../components/Start/StartScreen";
import SetupScreen from "../../components/Setup/SetupScreen";
import QuestionScreen from "../../components/Question/QuestionScreen";
import AnswerScreen from "../../components/Answer/AnswerScreen";
import { useState } from "react";

export default function Home({ mode, handleChangeMode }) {
  const [players, setPlayers] = useLocalStorageState("players", {
    defaultValue: [],
  });

  const [game, setGame] = useLocalStorageState("game", {
    defaultValue: [],
  });

  const [question, setQuestion] = useLocalStorageState("question", {
    defaultValue: "",
  });

  const [result, setResult] = useLocalStorageState("result", {
    defaultValue: {},
  });

  const [questionSpinner, setQuestionSpinner] = useState(false);

  function handleChangeGame(game) {
    setGame(game);
  }

  function handleAddPlayers(newPlayer) {
    setPlayers([...players, newPlayer]);
  }

  function handleDeletePlayer(playerId) {
    const newPlayers = players.filter((player) => player.playerId !== playerId);
    setPlayers(newPlayers);
  }

  function handleChangeQuestion(question) {
    setQuestion(question);
  }

  async function getAiQuestion() {
    setQuestionSpinner(true);
    try {
      const response = await fetch("/api/question");
      setQuestionSpinner(false);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const aiQuestion = await response.json();
      setQuestion(aiQuestion);
    } catch (error) {
      console.error("Error fetching question:", error);
      throw error;
    }
  }

  async function getAiAnswer(aiInput) {
    console.log("AI input:", aiInput);
    try {
      const response = await fetch("/api/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aiInput),
      });

      const answer = await response.json();

      console.log("Answer:", answer);

      if (!response.ok) {
        throw new Error(answer.message || "Something went wrong");
      }
      setResult(answer);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <Head>
        <title>GUESS MASTER</title>
        <meta
          name="description"
          content="Guess Master – AI-powered guessing game"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {mode === "start" && <StartScreen onChangeMode={handleChangeMode} />}
        {mode === "setup" && (
          <SetupScreen
            onChangeMode={handleChangeMode}
            players={players}
            onAddPlayers={handleAddPlayers}
            onChangeGame={handleChangeGame}
            onDeletePlayer={handleDeletePlayer}
          />
        )}
        {mode === "question" && (
          <QuestionScreen
            question={question}
            onChangeQuestion={handleChangeQuestion}
            game={game}
            players={players}
            getAiQuestion={getAiQuestion}
            questionSpinner={questionSpinner}
            onChangeMode={handleChangeMode}
          />
        )}
        {mode === "answer" && (
          <AnswerScreen
            question={question}
            game={game}
            players={players}
            onChangeMode={handleChangeMode}
            getAiAnswer={getAiAnswer}
          />
        )}
      </div>
    </>
  );
}
