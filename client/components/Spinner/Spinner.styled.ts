import styled, { keyframes } from "styled-components";
import { position, layout, PositionProps } from "styled-system";

import { Colors } from "@types";

const spinAnimaton = keyframes`
  from {
    transform: rotate(0deg);
  } 

  to {
    transform: rotate(360deg);
  }
`;

export const Root = styled.div<PositionProps>`
  height: 28px;
  width: 28px;
  display: inline-block;
  position: relative;
  pointer-events: none;
  vertical-align: middle;
  border-style: solid;
  border-color: ${Colors.blue};
  border-bottom-color: transparent;
  border-radius: 50%;
  border-width: 3px;
  animation: ${spinAnimaton} 1s linear infinite;

  ${layout}
  ${position}
`;
