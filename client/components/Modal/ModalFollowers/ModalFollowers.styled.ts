import styled from "styled-components";
import { Colors } from "@types";

export const Root = styled.div`
  width: 100%;
  height: 400px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.instaDefault};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #dbdbdb;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
  overflow-y: auto;
  flex-grow: 1;
  height: 100%;
`;

export const UserItem = styled.li`
  display: flex;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${Colors.hoverInsta};
  }
`;

export const Username = styled.p`
  font-weight: bold;
  color: ${Colors.instaDefault};
  font-size: 14px;
  display: flex;
  align-items: center;
`;
