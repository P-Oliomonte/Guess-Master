import styled from "styled-components";

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

  &:hover {
    background: var(--secondary-light);
  }

  &:active {
    background: var(--secondary-light);
  }
`;

export const StyledGameContainer = styled.div`
  margin: 0 auto;
  padding-top: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

export const StyledStartContainer = styled(StyledGameContainer)`
  padding-top: 0;
  margin: 50vh auto;
  transform: translateY(-60%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
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
