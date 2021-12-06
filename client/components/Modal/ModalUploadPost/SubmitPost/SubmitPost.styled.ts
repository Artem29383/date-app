import styled from "styled-components";
import { Colors } from "@types";

export const Root = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Area = styled.div`
  flex-shrink: 0;
  padding: 16px 0;
  width: 340px;
  border-left: 1px solid #dbdbdb;
  margin-left: auto;
`;

export const UserHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

export const UserName = styled.h1`
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  border: 0 solid #000;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  position: relative;
  font-weight: 600;
  font-size: 16px;
  color: #262626;
  line-height: 24px;
`;

export const PostField = styled.textarea`
  background: 0 0;
  border: 0;
  overflow: auto;
  margin: 16px 0;
  font-size: 16px;
  padding: 0 16px;
  line-height: 24px;
  width: 100%;
  max-height: 168px;
  min-height: 168px;
  color: #262626;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  resize: none;

  &::placeholder {
    color: ${Colors.instaPlaceholder};
  }
`;

export const PostFieldRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 16px;
`;

export const MaxSymbols = styled.span`
  color: #c7c7c7;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  &:hover {
    color: #262626;
  }
`;

export const Menu = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Label = styled.h1`
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.instaDefault};
`;
