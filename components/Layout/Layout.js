import styled from "styled-components";
import { useState } from "react";
import { StyledBoardHeadline } from "../../styledComponents";

export default function Layout({
  children,
  mode,
  result,
  isShowExplanation,
  toggleIsShowExplanation,
  onChangeMode,
  onDeleteQuestion,
  onDeleteResult,
  onChangeGame,
  onResetPlayersScores,
  onDeletePlayers,
}) {
  const [isShowResetConfirmation, setIsShowResetConfirmation] = useState(false);

  function handleReset() {
    onChangeMode("start");
    onDeleteQuestion();
    onDeleteResult();
    onChangeGame({});
    onResetPlayersScores();
    setIsShowResetConfirmation(false);
    onDeletePlayers();
  }

  return (
    <>
      {mode !== "start" && (
        <StyledHeader>
          <StyledImg src="./guess-master-logo.svg" alt="guess master logo" />
        </StyledHeader>
      )}
      {children}

      <StyledFooter>
        <StyledFooterButton>Manual</StyledFooterButton>
        <StyledFooterButton onClick={() => setIsShowResetConfirmation(true)}>
          Reset
        </StyledFooterButton>
      </StyledFooter>

      {isShowExplanation && (
        <StyledBackdrop onClick={toggleIsShowExplanation}>
          <StyledModal>
            <StyledExplanationHeadline>Explanation</StyledExplanationHeadline>

            <StyledModalText>{result.explanation}</StyledModalText>
          </StyledModal>
        </StyledBackdrop>
      )}
      {isShowResetConfirmation && (
        <StyledBackdrop onClick={() => setIsShowResetConfirmation(false)}>
          <StyledConfirmationDialog>
            <StyledConfirmationDialogText>
              Are you sure you want to reset the game?
            </StyledConfirmationDialogText>
            <StyledConfirmationDialogButtonWrapper>
              <StyledConfirmationDialogButton
                type="button"
                onClick={handleReset}
              >
                Yes
              </StyledConfirmationDialogButton>
              <StyledConfirmationDialogCancelButton
                type="button"
                onClick={() => setIsShowResetConfirmation(false)}
              >
                Cancel
              </StyledConfirmationDialogCancelButton>
            </StyledConfirmationDialogButtonWrapper>
          </StyledConfirmationDialog>
        </StyledBackdrop>
      )}
    </>
  );
}

const StyledImg = styled.img`
  width: 120px;
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  padding: 20px 0 14px 0;
`;

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  width: 80%;
  max-width: 500px;
  padding: 16px;
  background-color: var(--primary-dark);
  border-radius: 10px;
  border: 2px solid var(--secondary-light);
`;

const StyledConfirmationDialog = styled(StyledModal)`
  max-width: 280px;
`;

const StyledModalText = styled.p`
  color: var(--neutral-light);
  font: var(--button);
  line-height: 1.75;
  padding-top: 12px;
`;

const StyledConfirmationDialogText = styled(StyledModalText)`
  padding: 0;
  text-align: center;
`;

const StyledExplanationHeadline = styled(StyledBoardHeadline)`
  color: var(--primary-light);
`;

const StyledConfirmationDialogButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-top: 16px;
`;

const StyledConfirmationDialogButton = styled.button`
  display: inline-block;
  font: var(--button);
  color: var(--neutral-light);
  padding: 0 16px;
  background-color: var(--primary-dark);
  min-width: 60px;
  height: 26px;
  border: 1px solid var(--secondary-light);
  border-radius: 13px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: var(--secondary-light);
  }

  &:active {
    background-color: var(--secondary-light);
  }
`;

const StyledConfirmationDialogCancelButton = styled(
  StyledConfirmationDialogButton
)`
  border: 1px solid var(--primary-light);

  &:hover {
    background-color: var(--primary-light);
  }

  &:active {
    background-color: var(--primary-light);
  }
`;

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 82%;
  max-width: 602px;
  height: 50px;
  background: linear-gradient(#14142a00, var(--primary-dark) 30%);
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledFooterButton = styled.button`
  font: var(--button);
  color: var(--neutral-light);
  background: none;
  border: none;
  text-decoration: underline var(--secondary-light);
  cursor: pointer;
`;
