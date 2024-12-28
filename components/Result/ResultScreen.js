import styled from "styled-components";
import LargeLoadingSpinner from "../LargeLoadingSpinner/LargeLoadingSpinner";

import {
  StyledGameContainer,
  StyledLine,
  StyledMainHeadline,
  StyledMainButton,
  StyledQuestionBoard,
  StyledQuestion,
  StyledInstruction,
  StyledBoard,
  StyledBoardHeadline,
  StyledBoardHeaderWrapper,
  StyledBoardHeaderContent,
  StyledResultsWrapper,
  StyledResults,
} from "../../styledComponents";
import { useState, useEffect } from "react";

export default function ResultScreen({
  result,
  players,
  game,
  onChangeMode,
  onAddTotalScore,
  onChangeResult,
  toggleIsShowExplanation,
}) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (!result || !result.players || !result.question || !result.answer) {
      return;
    }

    setIsButtonDisabled(false);

    const updatedPlayers = result.players.map((thisRoundsPlayer) => {
      let score;
      if (players.length <= 3) {
        score =
          thisRoundsPlayer.playerRank === 1
            ? 10
            : thisRoundsPlayer.playerRank === 2
            ? 5
            : 0;
      }
      if (players.length > 3) {
        score =
          thisRoundsPlayer.playerRank === 1
            ? 20
            : thisRoundsPlayer.playerRank === 2
            ? 10
            : thisRoundsPlayer.playerRank === 3
            ? 5
            : 0;
      }

      onAddTotalScore(thisRoundsPlayer.playerId, score);

      return {
        ...thisRoundsPlayer,
        thisRoundsScore: score,
      };
    });
    const updatedResult = { ...result, players: updatedPlayers };
    onChangeResult(updatedResult);
  }, [result]);

  if (!result || !result.players || !result.question || !result.answer) {
    return (
      <StyledGameContainer>
        <StyledLine />
        <StyledMainHeadline>Round {game.currentRound}</StyledMainHeadline>
        <StyledInstruction>Calculating result...</StyledInstruction>
        <LargeLoadingSpinner />
        <StyledLine />
        <StyledMainButton disabled={isButtonDisabled}>Ranking</StyledMainButton>
      </StyledGameContainer>
    );
  }

  const sortedThisRoundsPlayers = [...result.players].sort(
    (a, b) => a.playerRank - b.playerRank
  );

  return (
    <StyledGameContainer>
      <StyledLine />
      <StyledMainHeadline>Round {game.currentRound}</StyledMainHeadline>

      <StyledQuestionBoard>
        <StyledQuestion>{result.question}</StyledQuestion>
      </StyledQuestionBoard>

      <StyledAnswerContainer>
        <StyledAnswerHeadline>Answer:</StyledAnswerHeadline>
        <StyledAnswer>{result.answer}</StyledAnswer>
      </StyledAnswerContainer>

      <StyledSmallButton type="button" onClick={toggleIsShowExplanation}>
        Show explanation
      </StyledSmallButton>

      <StyledBoard>
        <StyledBoardHeadline>Results</StyledBoardHeadline>
        <StyledBoardHeaderWrapper>
          <StyledBoardHeaderContentPlayer />
          <StyledBoardHeaderContentGuess>
            Your guess
          </StyledBoardHeaderContentGuess>
          <StyledBoardHeaderContentScore>Score</StyledBoardHeaderContentScore>
        </StyledBoardHeaderWrapper>
        {sortedThisRoundsPlayers.map((thisRoundsPlayer) => {
          return (
            <StyledResultsWrapper key={thisRoundsPlayer.playerId}>
              <StyledResultsPlayer>
                <StyledResultsText>
                  {thisRoundsPlayer.playerName}
                </StyledResultsText>
              </StyledResultsPlayer>
              <StyledResultsAnswer>
                <StyledResultsText>
                  {thisRoundsPlayer.playerAnswer}
                </StyledResultsText>
              </StyledResultsAnswer>
              <StyledResultsScore>
                <StyledResultsText>
                  {thisRoundsPlayer.thisRoundsScore}
                </StyledResultsText>
              </StyledResultsScore>
            </StyledResultsWrapper>
          );
        })}
      </StyledBoard>

      <StyledLine />

      <StyledMainButton onClick={() => onChangeMode("rankings")}>
        Ranking
      </StyledMainButton>
    </StyledGameContainer>
  );
}

const StyledAnswerContainer = styled.div`
  padding: 25px 0 15px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledAnswerHeadline = styled.h3`
  width: 100%;
  font: var(--regular);
  color: var(--neutral-light);
  text-align: center;
`;

const StyledAnswer = styled.p`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--neutral-light);
`;

export const StyledSmallButton = styled.button`
  background: var(--primary-dark);
  color: var(--neutral-light);
  border: 1px solid var(--secondary-light);
  width: 100px;
  height: 24px;
  border-radius: 12px;
  color: var(--neutral-light);
  font-size: 0.6rem;
  margin-bottom: 28px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: var(--secondary-light);
  }

  &:active {
    background: var(--secondary-light);
  }
`;

const StyledResultsPlayer = styled(StyledResults)`
  width: 65%;
`;

const StyledResultsAnswer = styled(StyledResults)`
  width: 35%;
  justify-content: flex-end;
`;

const StyledResultsScore = styled(StyledResults)`
  min-width: 50px;
  justify-content: flex-end;
`;

const StyledResultsText = styled.p`
  font: var(--regular);
  color: var(--neutral-light);
`;

const StyledBoardHeaderContentPlayer = styled(StyledBoardHeaderContent)`
  width: 65%;
`;

const StyledBoardHeaderContentGuess = styled(StyledBoardHeaderContent)`
  width: 35%;
`;

const StyledBoardHeaderContentScore = styled(StyledBoardHeaderContent)`
  min-width: 50px;
`;
