import React, { memo, useState } from "react";

import * as S from "./PostWall.styled";
import ImageWrapper from "components/ImageWrapper";
import Text from "components/Text/Text";
import moment from "moment";
import { icons } from "styles/icons";
import Button from "components/Button";
import { IComment } from "src/entities/comment/types";
import { Colors } from "@types";

type Props = {
  avatarUrl: string;
  username: string;
  disableComments: boolean;
  description: string;
  createdAt: Date;
  favoriteCount: number;
  isFavorite: boolean;
  postId: string;
  onLike: (id: string) => void;
  onDisLike: (id: string) => void;
  onAddComment: (postId: string, comment: string) => void;
  comments: IComment[];
  myUserId: string;
  onRemoveComment: (commentId: string) => void;
};

const Cross = icons.cross;
const IconHeart = icons.heart;
const IconHeartFill = icons.heartFill;
const Mark = icons.mark;
const MarkFill = icons.markfill;

const PostWall = ({
  avatarUrl,
  username,
  onRemoveComment,
  disableComments,
  createdAt,
  favoriteCount,
  description,
  myUserId,
  isFavorite,
  postId,
  comments,
  onLike,
  onAddComment,
  onDisLike
}: Props) => {
  const [comment, setComment] = useState("");

  const handleLike = () => {
    onLike(postId);
  };

  const handleDisLike = () => {
    onDisLike(postId);
  };

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setComment(e.target.value);
  };

  const handleCommentAdd = () => {
    onAddComment(postId, comment);
    setComment("");
  };

  return (
    <S.Root>
      <S.Header>
        <S.User>
          <ImageWrapper
            width={32}
            height={32}
            marginRight={15}
            overflow="hidden"
            borderRadius="50%"
            source={avatarUrl}
          />
          <Text>{username}</Text>
        </S.User>
      </S.Header>
      <S.DescriptionPost>
        <ImageWrapper
          flexShrink={0}
          width={32}
          height={32}
          marginRight={15}
          overflow="hidden"
          borderRadius="50%"
          source={avatarUrl}
        />
        <S.DescriptionContainer>
          <S.Description>{description}</S.Description>
          <S.Date>{moment(createdAt).format("DD.MM.YYYY")}</S.Date>
        </S.DescriptionContainer>
      </S.DescriptionPost>
      {!disableComments && (
        <S.CommentList>
          {comments.map(commentItem => (
            <S.CommentRow key={commentItem.id}>
              <ImageWrapper
                width={32}
                height={32}
                marginRight={15}
                overflow="hidden"
                borderRadius="50%"
                source={commentItem.userAvatar}
              />
              <S.Comment>
                <S.CommentContent>
                  <Text>{commentItem.username}</Text>
                  <S.Description>{commentItem.text}</S.Description>
                </S.CommentContent>
                <S.BottomComment>
                  <S.Date>
                    {moment(commentItem.createdAt).format("DD.MM.YYYY")}
                  </S.Date>
                  {myUserId === commentItem.userId && (
                    <Cross
                      onClick={() => onRemoveComment(commentItem.id)}
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
          ))}
        </S.CommentList>
      )}
      <S.Actions>
        <Text>{favoriteCount}</Text>
        {isFavorite ? (
          <IconHeartFill
            cursor="pointer"
            onClick={handleDisLike}
            marginLeft={10}
          />
        ) : (
          <IconHeart cursor="pointer" onClick={handleLike} marginLeft={10} />
        )}
        <Mark cursor="pointer" marginLeft="auto" />
      </S.Actions>
      {!disableComments && (
        <S.CommentRowInput>
          <S.Input
            placeholder="Добавьте комментарий..."
            value={comment}
            onChange={handleChange}
          />
          <Button
            onClick={handleCommentAdd}
            disabled={!comment.trim()}
            typeButton="facebook"
          >
            Опубликовать
          </Button>
        </S.CommentRowInput>
      )}
    </S.Root>
  );
};

export default memo(PostWall);
