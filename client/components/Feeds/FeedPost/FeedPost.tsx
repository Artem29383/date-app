import React from "react";

import * as S from "./FeedPost.styled";
import ImageWrapper from "components/ImageWrapper";
import Link from "next/link";
import { Colors, ROUTES } from "@types";
import Text from "components/Text/Text/Text";
import { icons } from "styles/icons";
import moment from "moment";
import { IComment } from "src/entities/comment/types";
import PostInputComment from "components/Post/PostInputComment/PostInputComment";
import PostCommentList from "components/Post/PostCommentList";

type Props = {
  userAvatar: string;
  username: string;
  userId: string;
  image: string;
  favoriteCount: number;
  isFavorite: boolean;
  isMark: boolean;
  comments: IComment[];
  disableComments: boolean;
  myUserId: string;
  postId: string;
  comment: string;
  onChangeComment: (e: {
    target: { value: React.SetStateAction<string> };
  }) => void;
  onLike: (p: string) => void;
  onDislike: (p: string) => void;
  onDeleteComment: (commentId: string, postId: string) => void;
  onAddComment: (postId: string) => void;
};

const IconHeart = icons.heart;
const IconHeartFill = icons.heartFill;
const Mark = icons.mark;
const MarkFill = icons.markfill;

const FeedPost = ({
  userAvatar,
  username,
  userId,
  image,
  favoriteCount,
  isFavorite = false,
  isMark = false,
  comments,
  disableComments,
  myUserId,
  postId,
  comment,
  onChangeComment,
  onLike,
  onDislike,
  onDeleteComment,
  onAddComment
}: Props) => {
  const handleAddComment = () => {
    onAddComment(postId);
  };

  const handleLike = () => {
    onLike(postId);
  };

  const handleDislike = () => {
    onDislike(postId);
  };

  return (
    <S.Root>
      <S.Header>
        <ImageWrapper
          source={userAvatar}
          width={32}
          height={32}
          marginRight={14}
          borderRadius="50%"
          overflow="hidden"
        />
        <S.Username>
          <Link href={`${ROUTES.PROFILE}/${userId}`}>
            <a href={`${ROUTES.PROFILE}/${userId}`}>{username}</a>
          </Link>
        </S.Username>
      </S.Header>
      <S.ContainerImage>
        <ImageWrapper source={image} />
      </S.ContainerImage>
      <S.Actions>
        <Text>{favoriteCount}</Text>
        {isFavorite ? (
          <IconHeartFill
            cursor="pointer"
            onClick={handleDislike}
            marginLeft={10}
          />
        ) : (
          <IconHeart cursor="pointer" onClick={handleLike} marginLeft={10} />
        )}
        {isMark ? (
          <MarkFill onClick={() => {}} cursor="pointer" marginLeft="auto" />
        ) : (
          <Mark onClick={() => {}} cursor="pointer" marginLeft="auto" />
        )}
      </S.Actions>
      <PostCommentList
        disableComments={disableComments}
        comments={comments}
        myUserId={myUserId}
        onDeleteComment={onDeleteComment}
        postId={postId}
      />
      {!disableComments && (
        <PostInputComment
          comment={comment}
          onChange={onChangeComment}
          onAdd={handleAddComment}
        />
      )}
    </S.Root>
  );
};

export default FeedPost;
