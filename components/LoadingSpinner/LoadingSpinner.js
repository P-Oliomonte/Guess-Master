import styled from "styled-components";

export default function LoadingSpinner() {
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
  width: 31px;
  height: 31px;
  border: 3px solid var(--neutral-light);
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
