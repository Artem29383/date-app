import React, { memo, useState } from "react";

import * as S from "./PostWall.styled";
import ImageWrapper from "components/ImageWrapper";
import Text from "components/Text/Text";
import moment from "moment";
import { icons } from "styles/icons";
import heartFill from "assets/icons/heartFill.svg";
import { CommentList } from "./PostWall.styled";
import InstaInput from "components/InstaInput";
import Button from "components/Button";

type Props = {
  avatarUrl: string;
  username: string;
  id: string;
  disableComments: boolean;
  description: string;
  createdAt: Date;
  favoriteCount: number;
  isFavorite: boolean;
  postId: string;
  onLike: (id: string) => void;
  onDisLike: (id: string) => void;
};

const IconHeart = icons.heart;
const IconHeartFill = icons.heartFill;

const PostWall = ({
  avatarUrl,
  username,
  id,
  disableComments,
  createdAt,
  favoriteCount,
  description,
  isFavorite,
  postId,
  onLike,
  onDisLike
}: Props) => {
  const [comment, setComment] = useState("");

  const handleLike = () => {
    onLike(postId);
  };

  const handleDisLike = () => {
    onDisLike(postId);
  };

  const handleChange = e => {
    setComment(e.target.value);
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
      <S.CommentList />
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
      </S.Actions>
      <S.CommentRow>
        <S.Input
          placeholder="Добавьте комментарий..."
          value={comment}
          onChange={handleChange}
        />
        <Button disabled={!comment.trim()} typeButton="facebook">
          Опубликовать
        </Button>
      </S.CommentRow>
    </S.Root>
  );
};

export default memo(PostWall);
