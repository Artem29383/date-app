import styled from "styled-components";
import { Colors } from "@types";

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #efefef;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
`;

export const DescriptionPost = styled.div`
  display: flex;
  padding: 14px 10px;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

export const Description = styled.p`
  margin-bottom: 5px;
`;

export const Danger = styled.div``;

export const Date = styled.time`
  font-size: 12px;
  color: #8e8e8e;
`;

export const Actions = styled.div`
  padding: 14px 20px;
  align-items: center;
  display: flex;
  border-bottom: 1px solid #efefef;
  border-top: 1px solid #efefef;
`;

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

export const CommentRowInput = styled.div`
  height: 53px;
  padding: 10px 10px 10px 35px;
  display: flex;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 14px;
  line-height: 18px;
  color: ${Colors.instaDefault};

  &::placeholder {
    color: ${Colors.instaPlaceholder};
  }
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
