import { FaSpinner } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

const Spin = keyframes`
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(360deg);
  }
`;

export const SpinnerInAnimation = styled(FaSpinner)`
  animation: ${Spin} 1s infinite forwards;
  font-size: 1.2rem;
`;
