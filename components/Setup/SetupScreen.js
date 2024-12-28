import styled from "styled-components";
import { uid } from "uid";
import {
  StyledGameContainer,
  StyledLine,
  StyledMainButton,
  StyledMainHeadline,
  StyledInputWrapper,
  StyledLabel,
  StyledInput,
  StyledBoard,
  StyledBoardHeadline,
  StyledInstruction,
} from "../../styledComponents";

export default function SetupScreen({
  onChangeMode,
  players,
  onAddPlayers,
  onChangeGame,
  onDeletePlayer,
}) {
  function handlePlayerSubmit(event) {
    event.preventDefault();
    const player = {
      playerId: uid(),
      playerName: event.target.player.value,
      score: 0,
    };

    onAddPlayers(player);
    event.target.reset();
  }

  function handleGameSubmit(event) {
    event.preventDefault();
    const game = {
      gameId: uid(),
      numberOfRounds: parseInt(event.target.numberOfRounds.value),
      currentRound: 1,
      currentPlayer: 0,
    };
    onChangeGame(game);
    onChangeMode("question");
  }

  return (
    <StyledGameContainer>
      <StyledLine />
      <StyledMainHeadline>Game Setup</StyledMainHeadline>
      <StyledSetupInstruction>
        Enter player names and number of rounds.
      </StyledSetupInstruction>
      <StyledPlayerForm onSubmit={handlePlayerSubmit}>
        <StyledInputWrapper>
          <StyledPlayerLabel htmlFor="player">
            Player {players.length + 1}
          </StyledPlayerLabel>
          <StyledInput
            type="text"
            name="player"
            id="player"
            minLength="1"
            maxLength="24"
            required
          />
        </StyledInputWrapper>
        <StyledFormButton type="submit">Join</StyledFormButton>
      </StyledPlayerForm>

      <StyledBoard>
        <StyledBoardHeadline>Players</StyledBoardHeadline>
        {players.map((player) => {
          return (
            <StyledPlayerCard key={player.playerId}>
              <StyledPlayerName>{player.playerName}</StyledPlayerName>
              <StyledDeleteButton
                onClick={() => onDeletePlayer(player.playerId)}
              >
                <img src="./icon-delete.svg" alt="delete icon" />
              </StyledDeleteButton>
            </StyledPlayerCard>
          );
        })}
      </StyledBoard>

      <StyledRoundsForm onSubmit={handleGameSubmit}>
        <StyledInputWrapper>
          <StyledRoundsLabel htmlFor="number-of-rounds">
            Number of Rounds
          </StyledRoundsLabel>
          <StyledRoundsInput
            type="number"
            name="numberOfRounds"
            id="number-of-rounds"
            defaultValue={5}
            min={1}
          />
        </StyledInputWrapper>

        <StyledLine />
        <StyledMainButton type="submit">Play</StyledMainButton>
      </StyledRoundsForm>
    </StyledGameContainer>
  );
}

const StyledSetupInstruction = styled(StyledInstruction)`
  padding-top: 0;
`;

const StyledPlayerLabel = styled(StyledLabel)`
  min-width: 60px;
`;

const StyledFormButton = styled.button`
  display: inline-block;
  font: var(--button);
  color: var(--neutral-light);
  background-color: var(--secondary-light);
  min-width: 45px;
  height: 26px;
  border: none;
  border-radius: 13px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: var(--primary-light);
  }

  &:active {
    background-color: var(--primary-light);
  }
`;

const StyledPlayerForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 5px;
  margin-bottom: 15px;
`;

const StyledRoundsForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 22px;
`;

const StyledRoundsLabel = styled(StyledLabel)`
  width: 109px;
`;

const StyledRoundsInput = styled(StyledInput)`
  width: 50px;
  appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`;

const StyledPlayerCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-dark);
  width: 100%;
  padding: 0 0 0 10px;
  border-radius: 5px;
`;

const StyledPlayerName = styled.p`
  font: var(--regular);
  color: var(--neutral-light);
`;

const StyledDeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background-color: var(--primary-dark);
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
