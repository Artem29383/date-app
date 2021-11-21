import styled from "styled-components";
import {
  borderRadius,
  flexBasis,
  height,
  maxHeight,
  maxWidth,
  overflow,
  width
} from "styled-system";
import { Colors } from "@types";

export const WrapperImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
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
