import GlobalStyle from "../../globalStyles";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import Layout from "../../components/Layout/Layout";

export default function App({ Component, pageProps }) {
  const [mode, setMode] = useState("start");

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

  const [isShowExplanation, setIsShowExplanation] = useState(false);

  function toggleIsShowExplanation() {
    setIsShowExplanation(!isShowExplanation);
  }

  function handleChangeResult(newResult) {
    setResult(newResult);
  }

  function handleChangeMode(mode) {
    setMode(mode);
  }

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

  function handleAddTotalScore(playerId, score) {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player.playerId === playerId) {
          return { ...player, score: player.score + score };
        }
        return player;
      })
    );
  }

  function handleResetPlayersScores() {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        return { ...player, score: 0 };
      })
    );
  }

  function handleChangeQuestion(question) {
    setQuestion(question);
  }

  function handleAddRound() {
    setGame((prevGame) => {
      return {
        ...prevGame,
        currentRound: prevGame.currentRound + 1,
      };
    });
  }

  function handleDeleteQuestion() {
    setQuestion("");
  }

  function handleDeleteResult() {
    setResult({});
  }

  function handleDeletePlayers() {
    setPlayers([]);
  }

  return (
    <>
      <GlobalStyle />
      <Layout
        mode={mode}
        result={result}
        isShowExplanation={isShowExplanation}
        toggleIsShowExplanation={toggleIsShowExplanation}
        onChangeMode={handleChangeMode}
        onDeleteQuestion={handleDeleteQuestion}
        onDeleteResult={handleDeleteResult}
        onChangeGame={handleChangeGame}
        onResetPlayersScores={handleResetPlayersScores}
        onDeletePlayers={handleDeletePlayers}
      >
        <Component
          {...pageProps}
          mode={mode}
          handleChangeMode={handleChangeMode}
          players={players}
          handleAddPlayers={handleAddPlayers}
          handleDeletePlayer={handleDeletePlayer}
          game={game}
          handleChangeGame={handleChangeGame}
          question={question}
          handleChangeQuestion={handleChangeQuestion}
          result={result}
          onChangeResult={handleChangeResult}
          handleAddTotalScore={handleAddTotalScore}
          toggleIsShowExplanation={toggleIsShowExplanation}
          handleAddRound={handleAddRound}
          handleDeleteQuestion={handleDeleteQuestion}
          handleDeleteResult={handleDeleteResult}
          handleResetPlayersScores={handleResetPlayersScores}
        />
      </Layout>
    </>
  );
}
