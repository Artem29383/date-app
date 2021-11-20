import styled from "styled-components";
import { ClientVariables } from "@types";

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - ${ClientVariables.HEADER_HEIGHT}px);
  padding: 24px;
  background-color: #f6f7f9;
  position: relative;
`;
