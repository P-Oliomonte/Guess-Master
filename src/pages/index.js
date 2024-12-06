import Head from "next/head";
import useLocalStorageState from "use-local-storage-state";
import StartScreen from "../../components/Start/StartScreen";
import SetupScreen from "../../components/Setup/SetupScreen";
import QuestionScreen from "../../components/Question/QuestionScreen";

export default function Home({ mode, handleChangeMode }) {
  const [players, setPlayers] = useLocalStorageState("players", {
    defaultValue: [],
  });

  const [game, setGame] = useLocalStorageState("game", {
    defaultValue: [],
  });

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
        {mode === "question" && <QuestionScreen />}
      </div>
    </>
  );
}
