import styled from "styled-components";
import {
  StyledGameContainer,
  StyledLine,
  StyledMainHeadline,
  StyledMainButton,
  StyledInstruction,
} from "../../styledComponents";

export default function QuestionScreen() {
  return (
    <StyledGameContainer>
      <StyledLine />
      <StyledMainHeadline>Round 1</StyledMainHeadline>
      <StyledPlayerName>Name of Player 1</StyledPlayerName>
      <StyledInstruction>Enter your guessing question.</StyledInstruction>
      <StyledInput type="text" name="question" id="question" />

      <StyledLine />
      <StyledMainButton type="button">Submit</StyledMainButton>
    </StyledGameContainer>
  );
}

const StyledPlayerName = styled.p`
  font: var(--regular);
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
