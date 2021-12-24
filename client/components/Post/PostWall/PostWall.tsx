import React, { memo, useState } from "react";

import * as S from "./PostWall.styled";
import ImageWrapper from "components/ImageWrapper";
import Text from "components/Text/Text";
import moment from "moment";
import { icons } from "styles/icons";
import Button from "components/Button";
import { IComment } from "src/entities/comment/types";
import { Colors } from "@types";
import PostInputComment from "components/Post/PostInputComment";
import PostCommentList from "components/Post/PostCommentList";

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
  onMark: (id: string) => void;
  onUnMark: (id: string) => void;
  isMark: boolean;
  onRemovePost: (p: string) => void;
};

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
  onRemovePost,
  favoriteCount,
  description,
  myUserId,
  isFavorite,
  postId,
  comments,
  onLike,
  onAddComment,
  onDisLike,
  onMark,
  onUnMark,
  isMark
}: Props) => {
  const [comment, setComment] = useState("");

  const handleLike = () => {
    onLike(postId);
  };

  const handleMark = () => {
    onMark(postId);
  };

  const handleUnMark = () => {
    onUnMark(postId);
  };

  const handleDisLike = () => {
    onDisLike(postId);
  };

  const handleRemovePost = () => {
    onRemovePost(postId);
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
        <S.Danger>
          <Button onClick={handleRemovePost} isRemove typeButton="facebook">
            Удалить
          </Button>
        </S.Danger>
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
      <PostCommentList
        disableComments={disableComments}
        comments={comments}
        myUserId={myUserId}
        onDeleteComment={onRemoveComment}
        postId={postId}
      />
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
        {isMark ? (
          <MarkFill onClick={handleUnMark} cursor="pointer" marginLeft="auto" />
        ) : (
          <Mark onClick={handleMark} cursor="pointer" marginLeft="auto" />
        )}
      </S.Actions>
      {!disableComments && (
        <PostInputComment
          comment={comment}
          onChange={handleChange}
          onAdd={handleCommentAdd}
        />
      )}
    </S.Root>
  );
};

export default memo(PostWall);
