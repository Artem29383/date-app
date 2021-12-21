import styled from "styled-components";
import { ClientVariables, Colors } from "@types";

export const Root = styled.header`
  width: 100%;
  height: ${ClientVariables.HEADER_HEIGHT}px;
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  justify-content: center;
`;

export const InnerRoot = styled.div`
  max-width: 997px;
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

export const Search = styled.div`
  position: relative;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
  overflow-y: auto;
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
