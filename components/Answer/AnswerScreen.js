import styled from "styled-components";
import {
  StyledGameContainer,
  StyledLine,
  StyledMainHeadline,
  StyledMainButton,
  StyledInstruction,
  StyledQuestionBoard,
  StyledQuestion,
  StyledInputWrapper,
  StyledLabel,
  StyledInput,
} from "../../styledComponents";

export default function QuestionScreen({
  question,
  game,
  players,
  onChangeMode,
  getAiAnswer,
}) {
  function handleSubmitAnswers(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const answers = Object.fromEntries(formData);

    const playersWithAnswers = players.map((player) => {
      return {
        playerId: player.playerId,
        playerName: player.playerName,
        playerAnswer: answers[player.playerId],
        playerRank: null,
      };
    });

    const aiInput = {
      question: question,
      answer: null,
      explanation: null,
      players: playersWithAnswers,
    };

    getAiAnswer(aiInput);
  }

  return (
    <StyledGameContainer>
      <StyledLine />
      <StyledMainHeadline>Round {game.currentRound}</StyledMainHeadline>

      <StyledQuestionBoard>
        <StyledQuestion>{question}</StyledQuestion>
      </StyledQuestionBoard>

      <StyledInstruction>Take your guesses.</StyledInstruction>
      <StyledPAnswerForm onSubmit={handleSubmitAnswers}>
        <StyledAnswerContainer>
          {players.map((player) => {
            return (
              <StyledInputWrapper key={player.playerId}>
                <StyledAnswerLabel htmlFor={player.playerId}>
                  {player.playerName}
                </StyledAnswerLabel>
                <StyledAnswerInput
                  type="text"
                  id={player.playerId}
                  name={player.playerId}
                  minLength="1"
                  required
                />
              </StyledInputWrapper>
            );
          })}
        </StyledAnswerContainer>

        <StyledLine />
        <StyledMainButton type="submit">Submit</StyledMainButton>
      </StyledPAnswerForm>
    </StyledGameContainer>
  );
}

const StyledAnswerLabel = styled(StyledLabel)`
  width: 50%;
  text-align: left;
`;

const StyledAnswerInput = styled(StyledInput)`
  width: 50%;
`;

const StyledAnswerContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const StyledPAnswerForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 5px;
  margin-bottom: 15px;
`;
