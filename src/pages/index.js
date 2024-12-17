import Head from "next/head";
import StartScreen from "../../components/Start/StartScreen";
import SetupScreen from "../../components/Setup/SetupScreen";
import QuestionScreen from "../../components/Question/QuestionScreen";
import AnswerScreen from "../../components/Answer/AnswerScreen";
import ResultScreen from "../../components/Result/ResultScreen";
import { useState } from "react";

export default function Home({
  mode,
  handleChangeMode,
  players,
  handleAddPlayers,
  handleDeletePlayer,
  game,
  handleChangeGame,
  question,
  handleChangeQuestion,
  result,
  onChangeResult,
  handleAddTotalScore,
}) {
  const [questionSpinner, setQuestionSpinner] = useState(false);

  async function getAiQuestion() {
    setQuestionSpinner(true);
    try {
      const response = await fetch("/api/question");
      setQuestionSpinner(false);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const aiQuestion = await response.json();
      handleChangeQuestion(aiQuestion);
    } catch (error) {
      console.error("Error fetching question:", error);
      throw error;
    }
  }

  async function getAiAnswer(aiInput) {
    try {
      const response = await fetch("/api/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aiInput),
      });

      const answer = await response.json();

      if (!response.ok) {
        throw new Error(answer.message || "Something went wrong");
      }
      onChangeResult(answer);
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
        {mode === "result" && (
          <ResultScreen
            result={result}
            players={players}
            game={game}
            onChangeMode={handleChangeMode}
            onAddTotalScore={handleAddTotalScore}
            onChangeResult={onChangeResult}
          />
        )}
      </div>
    </>
  );
}
