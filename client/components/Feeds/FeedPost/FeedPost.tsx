import React, { useRef, useState } from "react";

import * as S from "./FeedPost.styled";
import ImageWrapper from "components/ImageWrapper";
import Link from "next/link";
import { ROUTES } from "@types";
import Text from "components/Text/Text/Text";
import { icons } from "styles/icons";
import { IComment } from "src/entities/comment/types";
import PostInputComment from "components/Post/PostInputComment/PostInputComment";
import PostCommentList from "components/Post/PostCommentList";
import { setDisLikePost, setLikePost } from "src/entities/post/async";
import {
  addCommentToPostAsync,
  removeCommentFromPostAsync
} from "src/entities/comment/async";
import { IPost } from "src/entities/post/types";
import { addReplyToCommentAsync } from "src/entities/reply/async";

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
  setPosts: React.Dispatch<React.SetStateAction<{ [key: string]: IPost }>>;
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
  setPosts
}: Props) => {
  const [comment, setComment] = useState("");
  const [commentIdForReply, setCommentId] = useState("");

  const $postInput = useRef<HTMLInputElement>();

  const handleChangeComment = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setComment(e.target.value);
  };

  const handleLikePost = async () => {
    await setLikePost(postId);
    setPosts(prevState => ({
      ...prevState,
      [postId]: {
        ...prevState[postId],
        isFavorite: true,
        favoritesCount: prevState[postId].favoritesCount += 1
      }
    }));
  };

  const handleDisLikePost = async () => {
    await setDisLikePost(postId);
    setPosts(prevState => ({
      ...prevState,
      [postId]: {
        ...prevState[postId],
        isFavorite: false,
        favoritesCount: prevState[postId].favoritesCount -= 1
      }
    }));
  };

  const handleRemoveComment = async (commentId: string) => {
    await removeCommentFromPostAsync({ commentId });
    setPosts(prevState => ({
      ...prevState,
      [postId]: {
        ...prevState[postId],
        comments: prevState[postId].comments.filter(com => com.id !== commentId)
      }
    }));
  };

  const handleAddCommentOrReply = async () => {
    const isReplyUsername = comment.match(/^@([a-zA-Z0-9.]+)\s/);

    if (!isReplyUsername) {
      const response = await addCommentToPostAsync({
        postId,
        text: comment
      });
      setPosts(prevState => ({
        ...prevState,
        [postId]: {
          ...prevState[postId],
          comments: [...prevState[postId].comments, response]
        }
      }));
    } else {
      const response = await addReplyToCommentAsync({
        commentId: commentIdForReply,
        text: comment.replace(isReplyUsername[0], ""),
        replyUsername: isReplyUsername[1]
      });
      console.info("response", response);
    }
    setComment("");
    setCommentId("");
  };

  const handleReplay = (commentId: string, usernameReplay: string) => {
    setComment(`@${usernameReplay}${comment} `);
    setCommentId(commentId);
    $postInput.current?.focus();
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
            onClick={handleDisLikePost}
            marginLeft={10}
          />
        ) : (
          <IconHeart
            cursor="pointer"
            onClick={handleLikePost}
            marginLeft={10}
          />
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
        postId={postId}
        onDeleteComment={handleRemoveComment}
        onReplay={handleReplay}
      />
      {!disableComments && (
        <PostInputComment
          comment={comment}
          $postInput={$postInput as React.RefObject<HTMLInputElement>}
          onChange={handleChangeComment}
          onAdd={handleAddCommentOrReply}
        />
      )}
    </S.Root>
  );
};

export default FeedPost;
