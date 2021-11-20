import styled from "styled-components";
import { Colors } from "@types";

export const Root = styled.div`
  width: 16px;
  height: 16px;
  cursor: pointer;
  position: relative;
  background: ${Colors.instaCross};
  border-radius: 50%;
  min-width: 16px;
  min-height: 16px;
`;

export const Line = styled.div<{ rotate: number }>`
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${({ rotate }) => `translate(-50%, -50%) rotate(${rotate}deg)`};
  background-color: #fff;
  height: 1px;
`;
