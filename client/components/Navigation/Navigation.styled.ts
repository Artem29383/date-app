import styled from "styled-components";
import { margin, MarginProps } from "styled-system";
import { Colors } from "@types";

export const Root = styled.div`
  display: flex;
`;

export const RootAvatar = styled.div<{ open: boolean }>`
  border-radius: 50%;
  padding: 2px;
  cursor: pointer;
  position: relative;
  border: ${({ open }) => (open ? "1px solid black" : "1px solid transparent")};
`;

export const List = styled.ul`
  width: 100%;
  height: 100%;
`;

export const LikeNotify = styled.div<MarginProps>`
  ${margin};
  cursor: pointer;
  position: relative;
`;

export const Dot = styled.div`
  background: ${Colors.red};
  width: 4px;
  height: 4px;
  margin: 0 auto;
  border-radius: 50%;
`;

export const Notify = styled.div`
  width: auto;
  height: 40px;
  position: absolute;
  background-color: ${Colors.red};
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: rgb(0 0 0 / 20%) 0 4px 22px;
  user-select: none;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  top: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ListNotify = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NotifyItem = styled.div`
  color: ${Colors.white};
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    margin-left: 2.5px;
    width: 16px;
    height: 16px;
  }

  &:not(:last-child) {
    margin-right: 9px;
  }
`;

export const Triangle = styled.div`
  border-radius: 2px;
  height: 15px;
  margin: auto;
  transform: translateX(-50%) rotate(45deg);
  width: 15px;
  z-index: 1;
  position: absolute;
  top: -6px;
  left: 50%;
  background-color: ${Colors.red};
`;

export const Item = styled.li`
  padding: 8px 16px;
  display: flex;
  z-index: 5;
  cursor: pointer;
  justify-content: flex-start;

  a {
    width: 100%;
    height: 100%;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
`;
