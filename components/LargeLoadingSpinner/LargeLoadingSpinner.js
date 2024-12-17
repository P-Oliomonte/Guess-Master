import styled from "styled-components";

export default function LargeLoadingSpinner() {
  return (
    <LoadingSpinnerContainer>
      <StyledLoadingSpinner aria-label="loading-spinner" />
    </LoadingSpinnerContainer>
  );
}

const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLoadingSpinner = styled.span`
  width: 50px;
  height: 50px;
  border: 5px solid var(--neutral-light);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
