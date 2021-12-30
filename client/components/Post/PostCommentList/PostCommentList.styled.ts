import styled from "styled-components";
import { Colors } from "@types";

export const CommentList = styled.div`
  display: flex;
  border-top: 1px solid #efefef;
  flex-grow: 1;
  flex-direction: column;
  overflow-y: auto;
`;

export const CommentRow = styled.div`
  padding: 0 10px 10px 10px;
  display: flex;
  flex-direction: column;

  &:first-child {
    padding-top: 10px;
  }
`;

export const CommentRowPreview = styled.div`
  padding: 0 10px 10px 10px;
  cursor: pointer;
  color: ${Colors.instaPlaceholder};
  font-size: 12px;
`;
