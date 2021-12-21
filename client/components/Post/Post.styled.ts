import styled from "styled-components";
import { Colors } from "@types";

export const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  display: none;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const Root = styled.div`
  position: relative;

  &:hover ${Background} {
    display: flex;
  }
`;

export const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export const Text = styled.p`
  color: ${Colors.white};
  font-weight: bold;
  font-size: 18px;
`;
