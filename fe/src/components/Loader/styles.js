import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const fadeOut = keyframes`
  from { opacity: 1 }
  to { opacity: 0}
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(246, 245, 252, 0.7);
  backdrop-filter: blur(1px);
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s forwards;

  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${fadeOut} 0.3s forwards;
    `}
`;
