import GlobalStyle from "../../globalStyles";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";

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
    setPlayers(
      players.map((player) => {
        if (player.playerId === playerId) {
          return { ...player, score: player.score + score };
        }
        return player;
      })
    );
  }

  function handleChangeQuestion(question) {
    setQuestion(question);
  }

  return (
    <>
      <GlobalStyle />
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
      />
    </>
  );
}
