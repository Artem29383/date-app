import styled, { keyframes } from 'styled-components';
import { position } from 'styled-system';

const pathTriangle = keyframes`
  33% {
    stroke-dashoffset: 74;
  }
  66% {
    stroke-dashoffset: 147;
  }
  100% {
    stroke-dashoffset: 221;
  }
`;
const dotTriangle = keyframes`
  33% {
    transform: translate(-4px,-10px);
  }
  66% {
    transform: translate(3px,-23px);
  }
  100% {
    transform: translate(-13px, -22px);
  }
`;

export const Root = styled.div<{
  color: string;
  transform?: { x: string; y: string };
}>`
  width: 38px;
  height: 34px;
  position: relative;
  transform: ${({ transform }) =>
    transform ? `translate(${transform.x}, ${transform.y})` : 'initial'};
  ${position};

  &:before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    position: absolute;
    display: block;
    background: ${({ color }) => color};
    top: 37px;
    left: 21px;
    transform: translate(-13px, -22px);
    animation: ${dotTriangle} 1.5s cubic-bezier(0.785, 0.135, 0.15, 0.86)
      infinite;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;

    polygon {
      fill: none;
      stroke: ${({ color }) => color};
      stroke-width: 10px;
      stroke-linejoin: round;
      stroke-linecap: round;
    }

    polygon {
      stroke-dasharray: 145 76 145 76;
      stroke-dashoffset: 0;
      animation: ${pathTriangle} 1.5s cubic-bezier(0.785, 0.135, 0.15, 0.86)
        infinite;
    }
  }
`;
