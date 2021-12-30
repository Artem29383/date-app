import styled from "styled-components";
import { Colors } from "@types";

export const Root = styled.div<{ isProfilePost: boolean }>`
  width: ${({ isProfilePost }) => (isProfilePost ? "100%" : "616px")};
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #dbdbdb;
  margin-bottom: 24px;
  height: ${({ isProfilePost }) => (isProfilePost ? "100%" : "auto")};
`;

export const Header = styled.header`
  padding: 14px 4px 14px 16px;
  height: 60px;
  display: flex;
  align-items: center;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
`;

export const Danger = styled.div`
  margin-left: auto;
  margin-right: 20px;
`;

export const ContainerImage = styled.div`
  width: 100%;
`;

export const Username = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${Colors.instaDefault};

  &:hover {
    border-bottom: 1px solid ${Colors.instaDefault};
  }
`;

export const ContainerPost = styled.div<{ isProfilePost: boolean }>`
  display: ${({ isProfilePost }) => (isProfilePost ? "flex" : "block")};
  max-height: ${({ isProfilePost }) =>
    isProfilePost ? "calc(100% - 60px)" : "auto"};
`;

export const Wall = styled.div<{ isProfilePost: boolean }>`
  display: flex;
  flex-direction: column;
  max-width: ${({ isProfilePost }) => (isProfilePost ? "500px" : "auto")};
  min-width: ${({ isProfilePost }) => (isProfilePost ? "400px" : "auto")};
`;

export const Actions = styled.div`
  padding: 14px 20px;
  align-items: center;
  display: flex;
  border-bottom: 1px solid #efefef;
  border-top: 1px solid #efefef;
`;

export const CommentRow = styled.div`
  height: 53px;
  padding: 10px;
  display: flex;
  margin-bottom: 20px;
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

export const Date = styled.time`
  font-size: 12px;
  color: #8e8e8e;
`;
