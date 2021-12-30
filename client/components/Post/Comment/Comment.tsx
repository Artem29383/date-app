import React, { memo } from "react";
import * as S from "./Comment.styled";
import Text from "components/Text/Text/Text";
import moment from "moment";
import { Colors } from "@types";
import { icons } from "styles/icons";
import { IReply } from "src/entities/reply/types";
import Reply from "components/Post/Comment/Reply";
import ImageWrapper from "components/ImageWrapper";

const Cross = icons.cross;

export type PropsComment = {
  username: string;
  userAvatar: string;
  text: string;
  createdAt: Date;
  id: string;
  commentByUserId: string;
  myUserId: string;
  replies: IReply[];
  onDeleteComment: (id: string, replyLength: number) => void;
  onReplay: (id: string, username: string) => void;
  onDeleteReply: (replyId: string, commentId: string) => void;
};

const Comment = ({
  username,
  userAvatar,
  commentByUserId,
  myUserId,
  createdAt,
  id,
  text,
  replies,
  onDeleteComment,
  onReplay,
  onDeleteReply
}: PropsComment) => {
  const handleRemoveReply = (replyId: string) => {
    onDeleteReply(replyId, id);
  };

  return (
    <S.Comment>
      <S.CommentContent>
        <S.CommentHeader>
          <ImageWrapper
            source={userAvatar}
            width={32}
            height={32}
            marginRight={14}
            borderRadius="50%"
            overflow="hidden"
          />
          <Text>{username}</Text>
        </S.CommentHeader>
        <S.Description>{text}</S.Description>
      </S.CommentContent>
      <S.BottomComment>
        <S.Date>{moment(createdAt).format("DD.MM.YYYY")}</S.Date>
        <S.Answer onClick={() => onReplay(id, username)}>Ответить</S.Answer>
        {myUserId === commentByUserId && (
          <Cross
            onClick={() => onDeleteComment(id, replies.length)}
            cursor="pointer"
            marginLeft={5}
            height={7}
            width={7}
            fill={Colors.instaCross}
          />
        )}
      </S.BottomComment>
      <S.CommentReplyList>
        {replies.map(rep => (
          <Reply
            replyUser={rep.replyUsername}
            key={rep.id}
            userAvatar={rep.user.avatarUrl || ""}
            id={rep.id}
            username={rep.user.username}
            myUserId={myUserId}
            text={rep.text}
            commentByUserId={rep.userId}
            createdAt={rep.createdAt}
            onDeleteReply={handleRemoveReply}
          />
        ))}
      </S.CommentReplyList>
    </S.Comment>
  );
};

export default memo(Comment);
