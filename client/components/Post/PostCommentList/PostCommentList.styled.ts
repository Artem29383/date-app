import styled from "styled-components";
import { Colors } from "@types";

export const CommentList = styled.div`
  display: flex;
  border-top: 1px solid #efefef;
  flex-grow: 1;
  flex-direction: column;
`;

export const CommentRow = styled.div`
  height: 53px;
  padding: 10px;
  display: flex;
  margin-bottom: 20px;
`;

export const CommentRowPreview = styled.div`
  padding: 0 10px 10px 10px;
  cursor: pointer;
  color: ${Colors.instaPlaceholder};
  font-size: 12px;
`;

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentContent = styled.div``;

export const BottomComment = styled.div`
  display: flex;
  align-items: center;
`;

export const Description = styled.p`
  margin-bottom: 5px;
`;

export const Date = styled.time`
  font-size: 12px;
  color: #8e8e8e;
`;
