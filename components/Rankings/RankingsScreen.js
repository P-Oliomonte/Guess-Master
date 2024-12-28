import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  StyledGameContainer,
  StyledLine,
  StyledMainHeadline,
  StyledMainButton,
  StyledBoard,
  StyledBoardHeadline,
  StyledBoardHeaderWrapper,
  StyledBoardHeaderContent,
  StyledResultsWrapper,
  StyledResults,
} from "../../styledComponents";

export default function RankingsSceen({
  players,
  game,
  onChangeMode,
  onAddRound,
  onDeleteQuestion,
  onDeleteResult,
  onChangeGame,
}) {
  const [isWinner, setIsWinner] = useState(false);
  const sortedPlayers = players.sort((a, b) => b.score - a.score);

  useEffect(() => {
    if (game.currentRound === game.numberOfRounds) {
      console.log("Winner detected");
      setIsWinner(true);
    } else {
      setIsWinner(false);
    }
  }, [game]);

  function handleStartNextRound() {
    onChangeMode("question");
    onAddRound();
    onDeleteQuestion();
    onDeleteResult();
  }

  function handleStartNewGame() {
    onChangeMode("setup");
    onAddRound();
    onDeleteQuestion();
    onDeleteResult();
    onChangeGame({});
    setIsWinner(false);
  }

  return (
    <StyledGameContainer>
      <StyledLine />
      <StyledMainHeadline>Round {game.currentRound}</StyledMainHeadline>

      {isWinner && (
        <StyledWinnerContainer>
          <StyledWinnerText>Congratulations</StyledWinnerText>
          <StyledWinner>{sortedPlayers[0].playerName}</StyledWinner>
          <StyledWinnerText>You are the winner!</StyledWinnerText>
        </StyledWinnerContainer>
      )}

      <StyledBoard>
        <StyledBoardHeadline>Ranking</StyledBoardHeadline>

        <StyledBoardHeaderWrapper>
          <StyledBoardHeaderContentPlayer />
          <StyledBoardHeaderContentScore>Score</StyledBoardHeaderContentScore>
        </StyledBoardHeaderWrapper>

        {sortedPlayers.map((player, index) => (
          <StyledResultsWrapper key={player.playerId}>
            <StyledResultsRank>
              <StyledResultsText>{index + 1}</StyledResultsText>
            </StyledResultsRank>
            <StyledResultsPlayer>
              <StyledResultsText>{player.playerName}</StyledResultsText>
            </StyledResultsPlayer>
            <StyledResultsScore>
              <StyledResultsText>{player.score}</StyledResultsText>
            </StyledResultsScore>
          </StyledResultsWrapper>
        ))}
      </StyledBoard>
      <StyledLine />

      {!isWinner && (
        <StyledMainButton type="button" onClick={handleStartNextRound}>
          Next Round
        </StyledMainButton>
      )}
      {isWinner && (
        <StyledMainButton type="button" onClick={handleStartNewGame}>
          New Game
        </StyledMainButton>
      )}
    </StyledGameContainer>
  );
}

const StyledResultsPlayer = styled(StyledResults)`
  width: 100%;
`;

const StyledResultsScore = styled(StyledResults)`
  min-width: 50px;
  justify-content: flex-end;
`;

const StyledResultsRank = styled(StyledResults)`
  width: 30px;
`;

const StyledResultsText = styled.p`
  font: var(--regular);
  color: var(--neutral-light);
`;

const StyledBoardHeaderContentPlayer = styled(StyledBoardHeaderContent)`
  width: 100%;
`;

const StyledBoardHeaderContentScore = styled(StyledBoardHeaderContent)`
  min-width: 50px;
`;

const StyledWinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  padding-bottom: 28px;
`;

const StyledWinnerText = styled.h3`
  width: 100%;
  font: var(--question);
  color: var(--neutral-light);
  text-align: center;
`;

const StyledWinner = styled.p`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--neutral-light);
`;
