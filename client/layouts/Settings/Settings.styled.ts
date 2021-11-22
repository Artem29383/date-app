import styled from "styled-components";

export const Root = styled.div`
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  margin: 60px auto 0;
  overflow: hidden;
  width: 100%;
  display: flex;
`;

export const Navigation = styled.ul`
  width: 237px;
  min-width: 237px;
  border-right: 1px solid #dbdbdb;
`;

export const Item = styled.li`
  width: 100%;
  padding: 16px 16px 16px 30px;
  border-left: 2px solid transparent;

  &.active {
    font-weight: bold;
    border-left-color: #262626;
  }
`;
