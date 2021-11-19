import styled from "styled-components";
import { height, position, width } from "styled-system";
import { Colors } from "@types";

export const Root = styled.a<{ color: string }>`
  background-color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  ${height};
  ${width};
  ${position};

  &:hover {
    svg {
      fill: ${Colors.blue};
    }
  }
`;
