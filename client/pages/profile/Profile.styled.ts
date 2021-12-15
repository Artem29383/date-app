import styled from "styled-components";
import { Colors } from "@types";

export const Root = styled.div``;

export const Header = styled.header`
  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  flex-grow: 1;
`;

export const Row = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  width: 100%;
`;

export const Name = styled.h2`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #262626;
  font-weight: 300;
  font-size: 28px;
  line-height: 32px;
  margin: -5px 0 -6px;
  margin-right: 20px;
`;

export const Text = styled.span`
  font-size: 16px;
  margin-right: 20px;
  cursor: pointer;
`;

export const Bold = styled(Text)`
  font-weight: 600;
  margin-right: 4px;
`;

export const Navigation = styled.div`
  border-top: 1px solid #dbdbdb;
  margin-top: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonNavigation = styled.button<{ active: boolean }>`
  color: ${Colors.instaDefault};
  margin-right: 25px;
  padding: 20px;
  text-align: center;
  border-top: ${({ active }) =>
    `1px solid ${active ? Colors.instaDefault : "transparent"}`};
`;

export const Body = styled.div`
  width: 100%;
  justify-content: center;
  display: grid;
  grid-gap: 35px;
  margin-top: 30px;
  grid-template-columns: repeat(3, 293px);
  grid-auto-rows: 293px;
`;
