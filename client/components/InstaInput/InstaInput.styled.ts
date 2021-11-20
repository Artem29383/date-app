import styled from "styled-components";
import { Colors } from "@types";

export const Root = styled.div`
  padding: 3px 0 3px;
  border-radius: 3px;
  width: 215px;
  border: solid 1px #dbdbdb;
  background-color: #fafafa;
  display: flex;
  cursor: pointer;
  align-items: center;
  position: relative;
`;

export const Pos = styled.div<{ left?: string; right?: string }>`
  position: absolute;
  left: ${({ left }) => left || "none"};
  right: ${({ right }) => right || "none"};
  top: 50%;
  transform: translateY(-50%);
`;

export const Input = styled.input<{ isFocus: boolean }>`
  color: ${Colors.instaDefault};
  outline: 0;
  cursor: ${({ isFocus }) => (isFocus ? "text" : "pointer")};
  width: 100%;
  padding-right: 12px;
  padding-left: ${({ isFocus }) => (isFocus ? "6px" : "22px")};
  margin-left: 5px;
  font-size: 14px;

  &::placeholder {
    color: ${Colors.instaPlaceholder};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
  }
`;
