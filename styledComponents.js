import styled, { keyframes } from "styled-components";

export const appearOnScreen = keyframes`
0% {
  opacity: 0; 
}
100% {
  opacity: 1; 
}
`;

export const StyledLine = styled.div`
  background: linear-gradient(
    90deg,
    var(--primary-dark),
    var(--primary-light),
    var(--primary-dark)
  );
  width: 100%;
  height: 1px;
  margin-top: 28px;
  margin-bottom: 28px;
`;

export const StyledMainButton = styled.button`
  background: var(--primary-dark);
  color: var(--neutral-light);
  border: 1px solid var(--secondary-light);
  width: 110px;
  height: 34px;
  border-radius: 17px;
  box-shadow: 0 2px 24px var(--secondary-light);
  font: var(--button);
  cursor: pointer;
  transition: background 0.3s ease;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};

  &:hover {
    background: ${(props) =>
      props.disabled ? "var(--primary-dark)" : "var(--secondary-light)"};
  }

  &:active {
    background: ${(props) =>
      props.disabled ? "var(--primary-dark)" : "var(--secondary-light)"};
  }
`;

export const StyledGameContainer = styled.main`
  margin: 0 auto;
  padding: 0 0 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 600px;
  animation: ${appearOnScreen} 0.5s ease;
`;

export const StyledMainHeadline = styled.h2`
  font: var(--main-headline);
  color: var(--primary-light);
  padding-bottom: 24px;
`;

export const StyledBoard = styled.section`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  gap: 5px;
  width: 100%;
  padding: 7px;
  background: var(--gradient);
  border-radius: 10px;
`;

export const StyledBoardHeadline = styled.h3`
  font: var(--board-headline);
  color: var(--neutral-light);
  padding: 3px 0 3px 0;
`;

export const StyledBoardHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
`;

export const StyledBoardHeaderContent = styled.p`
  font: var(--regular);
  color: var(--neutral-light);
  text-align: center;
  padding: 0 10px;
`;

export const StyledResultsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
`;

export const StyledResults = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-dark);
  height: 29px;
  padding: 0 10px 0 10px;
  border-radius: 5px;
`;

export const StyledInstruction = styled.p`
  font: var(--instruction);
  color: var(--primary-light);
  padding: 20px 0;
`;

export const StyledLabel = styled.label`
  text-align: left;
  align-content: center;
  display: inline-block;
  font: var(--regular);
  color: var(--neutral-light);
  height: 26px;
  background: var(--gradient);
  border-radius: 13px 0 0 13px;
  padding: 0 10px;
`;

export const StyledInput = styled.input`
  display: inline-block;
  font: var(--regular);
  color: var(--neutral-light);
  width: 100%;
  height: 26px;
  background-color: var(--primary-dark);
  border: 1px solid var(--secondary-light);
  border-radius: 0 13px 13px 0;
  padding: 0 10px;

  &:focus {
    outline: none;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 100px var(--primary-dark) inset;
    -webkit-text-fill-color: var(--neutral-light);
    font: var(--regular);
    font-size: 0.625rem;
  }
`;

export const StyledInputWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const StyledQuestionBoard = styled.section`
  width: 100%;
  padding: 15px;
  background: var(--gradient);
  border-radius: 10px;
`;

export const StyledQuestion = styled.p`
  font: var(--question);
  color: var(--neutral-light);
`;
