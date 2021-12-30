import styled from "styled-components";
import {
  borderRadius,
  flexBasis,
  flexShrink,
  height,
  margin,
  maxHeight,
  maxWidth,
  overflow,
  width
} from "styled-system";
import { Colors } from "@types";

export const WrapperImage = styled.div<{
  onClick: (() => void) | undefined;
  onDoubleClick: (() => void) | undefined;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  cursor: ${({ onClick, onDoubleClick }) =>
    onClick || onDoubleClick ? "pointer" : "default"};
  justify-content: center;
  align-items: center;
  background-color: ${Colors.bombay};

  ${flexBasis};
  ${borderRadius};
  ${overflow};
  ${maxHeight};
  ${maxWidth};
  ${width};
  ${height};
  ${margin};
  ${flexShrink};
`;

export const Image = styled.img`
  max-width: 100%;
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 0;

  &.thumb {
    opacity: 1;
    filter: blur(10px);
    transition: opacity 1s ease-in-out;
    position: absolute;
    &.isLoaded {
      opacity: 0;
    }
  }

  &.isLoaded {
    transition: opacity 1s ease-in-out;
    opacity: 1;
  }
`;

export const ImageStatic = styled.img`
  max-width: 100%;
  height: 100%;
  width: 100%;
  object-fit: cover;

  &.thumb {
    filter: blur(10px);
    position: absolute;
  }
`;
