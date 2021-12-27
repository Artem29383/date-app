import styled from "styled-components";

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentReplyList = styled(Comment)`
  margin-left: 25px;
  margin-top: 10px;
`;

export const CommentReply = styled(Comment)`
  &:first-child {
    margin-bottom: 10px;
  }
`;

export const CommentContent = styled.div``;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

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
  margin-right: 12px;
`;

export const Answer = styled.button`
  color: #8e8e8e;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
`;
