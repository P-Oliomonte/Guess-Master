import styled, { keyframes } from "styled-components";
import {
  StyledGameContainer,
  StyledLine,
  StyledMainButton,
} from "../../styledComponents";

export default function StartScreen({ onChangeMode }) {
  return (
    <StyledStartContainer>
      <StyledWelcome>Welcome to</StyledWelcome>
      <StyledImg src="./guess-master-logo.svg" alt="guess master logo" />
      <StyledLine />
      <StyledMainButton type="button" onClick={() => onChangeMode("setup")}>
        Start
      </StyledMainButton>
    </StyledStartContainer>
  );
}

const pulseAnimation = keyframes`
  0%, 100% {
    transform: scale(1); 
  }
  50% {
    transform: scale(1.03); 
  }
`;

const StyledStartContainer = styled(StyledGameContainer)`
  padding-top: 0;
  margin: 50vh auto;
  transform: translateY(-60%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const StyledWelcome = styled.p`
  color: var(--secondary-light);
  font-size: 0.875rem;
  text-align: center;
  padding-bottom: 24px;
`;

const StyledImg = styled.img`
  width: 232px;
  animation: ${pulseAnimation} 1.5s ease-in-out infinite;
`;
