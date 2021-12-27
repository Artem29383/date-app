import React, { useState } from "react";
import * as S from "./PostCommentList.styled";
import { IComment } from "src/entities/comment/types";
import Comment from "components/Post/Comment";

type Props = {
  disableComments: boolean;
  comments: IComment[];
  myUserId: string;
  onDeleteComment: (commentId: string) => void;
  onReplay: (commentId: string, usernameReplay: string) => void;
};

const PostCommentList = ({
  disableComments,
  comments,
  onDeleteComment,
  myUserId,
  onReplay
}: Props) => {
  const [commentsPreview, setPreviewComments] = useState(3);

  const handlePreviewInfinity = () => {
    setPreviewComments(99999);
  };

  return !disableComments ? (
    <S.CommentList>
      {comments.slice(0, commentsPreview).map((commentItem, index) => (
        <div key={commentItem.id}>
          <S.CommentRow>
            <Comment
              userAvatar={commentItem.user.avatarUrl}
              commentByUserId={commentItem.userId}
              onDeleteComment={onDeleteComment}
              myUserId={myUserId}
              username={commentItem.user.username}
              createdAt={commentItem.createdAt}
              text={commentItem.text}
              onReplay={onReplay}
              id={commentItem.id}
              replies={commentItem.replays || []}
            />
          </S.CommentRow>
          {comments.length > commentsPreview && index === 2 && (
            <S.CommentRowPreview onClick={handlePreviewInfinity}>
              Показать все
            </S.CommentRowPreview>
          )}
        </div>
      ))}
    </S.CommentList>
  ) : null;
};

export default PostCommentList;
