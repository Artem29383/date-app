import styled from "styled-components";

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
