import React, { useState } from "react";
import Text from "components/Text/Text/Text";
import moment from "moment";
import { Colors } from "@types";

import * as S from "./PostCommentList.styled";
import { icons } from "styles/icons";
import { IComment } from "src/entities/comment/types";

const Cross = icons.cross;

type Props = {
  disableComments: boolean;
  comments: IComment[];
  myUserId: string;
  onDeleteComment: (commentId: string, postId: string) => void;
  postId: string;
};

const PostCommentList = ({
  disableComments,
  comments,
  onDeleteComment,
  myUserId,
  postId
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
            <S.Comment>
              <S.CommentContent>
                <Text>{commentItem.user.username}</Text>
                <S.Description>{commentItem.text}</S.Description>
              </S.CommentContent>
              <S.BottomComment>
                <S.Date>
                  {moment(commentItem.createdAt).format("DD.MM.YYYY")}
                </S.Date>
                {myUserId === commentItem.userId && (
                  <Cross
                    onClick={() => onDeleteComment(commentItem.id, postId)}
                    cursor="pointer"
                    marginLeft={5}
                    height={7}
                    width={7}
                    fill={Colors.instaCross}
                  />
                )}
              </S.BottomComment>
            </S.Comment>
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
