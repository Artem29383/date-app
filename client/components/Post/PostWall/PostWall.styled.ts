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

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

export const Date = styled.time`
  font-size: 12px;
  color: #8e8e8e;
`;

export const CommentRow = styled.div`
  height: 53px;
  padding: 10px;
  display: flex;
  margin-bottom: 20px;
`;

export const CommentRowInput = styled.div`
  border-top: 1px solid #efefef;
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
