import styled from "styled-components";
import {
  StyledGameContainer,
  StyledLine,
  StyledMainHeadline,
  StyledMainButton,
  StyledInstruction,
} from "../../styledComponents";

export default function QuestionScreen({
  question,
  onChangeQuestion,
  game,
  players,
  getAiQuestion,
}) {
  console.log(game);
  console.log(players);

  const currentPlayerIndex = (game.currentRound - 1) % players.length;

  return (
    <StyledGameContainer>
      <StyledLine />
      <StyledMainHeadline>Round {game.currentRound}</StyledMainHeadline>
      <StyledPlayerName>
        {players[currentPlayerIndex].playerName}
      </StyledPlayerName>
      <StyledInstruction>Enter your guessing question.</StyledInstruction>
      <StyledQuestionInputContainer>
        <StyledInput
          type="text"
          name="question"
          id="question"
          value={question}
          onChange={(event) => onChangeQuestion(event.target.value)}
        />
        <StyledAiButton type="button" onClick={getAiQuestion}>
          <p>AI</p>
          <img src="./icon-ai.svg" />
        </StyledAiButton>
      </StyledQuestionInputContainer>

      <StyledQuestionBoard>
        <StyledQuestion>{question}</StyledQuestion>
      </StyledQuestionBoard>

      <StyledLine />
      <StyledMainButton type="button">Submit</StyledMainButton>
    </StyledGameContainer>
  );
}

const StyledPlayerName = styled.p`
  font: var(--instruction);
  color: var(--neutral-light);
  background: var(--gradient);
  padding: 8px 10px;
  border-radius: 5px;
`;

const StyledInput = styled.input`
  display: inline-block;
  font: var(--regular);
  color: var(--neutral-light);
  width: 100%;
  height: 26px;
  background-color: var(--primary-dark);
  border: 1px solid var(--secondary-light);
  border-radius: 13px;
  padding: 0 10px;

  &:focus {
    outline: none;
  }
`;

const StyledAiButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
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

const StyledQuestionInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 5px;
  margin-bottom: 15px;
`;

const StyledQuestionBoard = styled.section`
  width: 100%;
  padding: 15px;
  background: var(--gradient);
  border-radius: 10px;
`;

const StyledQuestion = styled.p`
  font: var(--question);
  color: var(--neutral-light);
`;
