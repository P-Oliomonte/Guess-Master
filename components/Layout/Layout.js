import styled from "styled-components";
import { StyledBoardHeadline } from "../../styledComponents";

export default function Layout({
  children,
  mode,
  result,
  isShowExplanation,
  toggleIsShowExplanation,
}) {
  return (
    <>
      {mode !== "start" && (
        <StyledHeader>
          <StyledImg src="./guess-master-logo.svg" alt="guess master logo" />
        </StyledHeader>
      )}
      {children}
      {isShowExplanation && (
        <StyledBackdrop onClick={toggleIsShowExplanation}>
          <StyledModal>
            <StyledExplanationHeadline>Explanation</StyledExplanationHeadline>

            <StyledExplanation>{result.explanation}</StyledExplanation>
          </StyledModal>
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

const StyledExplanation = styled.p`
  color: var(--neutral-light);
  font: var(--button);
  line-height: 1.75;
  padding-top: 12px;
`;

const StyledExplanationHeadline = styled(StyledBoardHeadline)`
  color: var(--primary-light);
`;
