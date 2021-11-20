import styled from "styled-components";
import { ClientVariables } from "@types";

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
