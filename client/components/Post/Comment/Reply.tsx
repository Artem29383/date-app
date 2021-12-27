import React, { memo } from "react";
import * as S from "./Comment.styled";
import Text from "components/Text/Text/Text";
import moment from "moment";
import { Colors } from "@types";
import { PropsComment } from "components/Post/Comment/Comment";
import { icons } from "styles/icons";
import ImageWrapper from "components/ImageWrapper/ImageWrapper";

const Cross = icons.cross;

const Reply = ({
  username,
  userAvatar,
  id,
  commentByUserId,
  myUserId,
  text,
  createdAt
}: Omit<PropsComment, "replies" | "onReplay" | "onDeleteComment">) => {
  return (
    <S.CommentReply>
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
        {myUserId === commentByUserId && (
          <Cross
            onClick={() => {}}
            cursor="pointer"
            marginLeft={5}
            height={7}
            width={7}
            fill={Colors.instaCross}
          />
        )}
      </S.BottomComment>
    </S.CommentReply>
  );
};

export default memo(Reply);
