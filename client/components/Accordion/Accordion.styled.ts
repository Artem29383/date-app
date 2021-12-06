import styled from "styled-components";

export const Root = styled.div<{ active: boolean }>`
  padding: 14px 16px;
  border-top: 1px solid #dbdbdb;
  border-bottom: ${({ active }) =>
    active ? "0px solid #dbdbdb" : "1px solid #dbdbdb"};
`;

export const Row = styled.div<{ active: boolean }>`
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-bottom: ${({ active }) => (active ? "20px" : "0px")};
`;

export const Label = styled.h1<{ active: boolean }>`
  font-size: 16px;
  line-height: 24px;
  color: #262626;
  font-weight: ${({ active }) => (active ? 600 : 400)};
`;

export const Children = styled.div`
  width: 100%;
`;
