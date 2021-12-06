import styled from "styled-components";

export const Root = styled.div<{ active: boolean; widthElement: number }>`
  background-color: ${({ active }) => (!active ? "#8e8e8e" : "#0095f6")};
  border-radius: 28px;
  position: relative;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  cursor: pointer;
  width: ${({ widthElement }) => `${widthElement}px`};
`;

export const Dot = styled.div<{ active: boolean }>`
  background-color: #fff;
  border-radius: 50%;
  bottom: 3px;
  content: "";
  height: 20px;
  top: 50%;
  cursor: pointer;
  transform: translateY(-50%);
  left: ${({ active }) => (active ? "22px" : "2px")};
  position: absolute;
  transition: left 0.2s ease-in-out;
  width: 20px;
`;
