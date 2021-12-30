import React, { useEffect, useRef, useState } from "react";

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
import {
  addReplyToCommentAsync,
  removeReplyFromCommentAsync
} from "src/entities/reply/async";
import { toNormalize } from "utils/toNormalize";
import Button from "components/Button/Button";
import { removePostCommentCountById } from "src/entities/post/store";
import { useEvent } from "effector-react";

type Props = {
  isProfilePost: boolean;
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
  onRemovePost?: (p: string) => void;
  onDislikePost: (postId: string) => void;
  onLikePost: (postId: string) => void;
  onMark: (postId: string) => void;
  onUnMark: (postId: string) => void;
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
  isProfilePost = true,
  onRemovePost,
  onLikePost,
  onDislikePost,
  onUnMark,
  onMark
}: Props) => {
  const removePostCommentCountByIdEvent = useEvent(removePostCommentCountById);
  const [comment, setComment] = useState("");
  const [commentIdForReply, setCommentId] = useState("");
  const [commentsItems, setComments] = useState<{ [key: string]: IComment }>(
    {}
  );
  const [commentsIds, setCommentsIds] = useState<string[]>([]);

  const handleMarkPost = () => {
    onMark(postId);
  };

  const handleUnMarkPost = () => {
    onUnMark(postId);
  };

  const handleLikePost = () => {
    onLikePost(postId);
  };

  const handleDislikePost = () => {
    onDislikePost(postId);
  };

  const handleRemovePost = () => {
    if (onRemovePost) {
      onRemovePost(postId);
    }
  };

  useEffect(() => {
    const normalize = toNormalize({ items: comments }, "items");
    setComments(prevState => {
      return { ...prevState, ...normalize.entities.items };
    });
    setCommentsIds(prevState => [...prevState, ...normalize.result.items]);
  }, [comments]);

  const $postInput = useRef<HTMLInputElement>();

  const handleChangeComment = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setComment(e.target.value);
  };

  const handleRemoveComment = async (
    commentId: string,
    replyLength: number
  ) => {
    await removeCommentFromPostAsync({ commentId });
    setCommentsIds(commentsIds.filter(comId => comId !== commentId));
    removePostCommentCountByIdEvent({ id: postId, diff: replyLength + 1 });
  };

  const handleRemoveReply = async (replyId: string, commentId: string) => {
    await removeReplyFromCommentAsync({ replyId, commentId });
    setComments(prevState => ({
      ...prevState,
      [commentId]: {
        ...prevState[commentId],
        replays: prevState[commentId].replays.filter(rep => rep.id !== replyId)
      }
    }));
    removePostCommentCountByIdEvent({ id: postId, diff: 1 });
  };

  const handleAddCommentOrReply = async () => {
    const isReplyUsername = comment.match(/^@([a-zA-Z0-9.]+)\s/);

    if (!isReplyUsername) {
      const response = await addCommentToPostAsync({
        postId,
        text: comment
      });

      setComments(prevState => ({
        ...prevState,
        [response.id]: response
      }));
      setCommentsIds(prevState => [...prevState, response.id]);
    } else {
      const response = await addReplyToCommentAsync({
        commentId: commentIdForReply,
        text: comment.replace(isReplyUsername[0], ""),
        replyUsername: isReplyUsername[1]
      });

      setComments(prevState => ({
        ...prevState,
        [commentIdForReply]: {
          ...prevState[commentIdForReply],
          replays: [...prevState[commentIdForReply].replays, response]
        }
      }));
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
    <S.Root isProfilePost={isProfilePost}>
      <S.Header>
        <S.User>
          <ImageWrapper
            width={32}
            height={32}
            marginRight={15}
            overflow="hidden"
            borderRadius="50%"
            source={userAvatar}
          />
          <S.Username>
            <Link href={`${ROUTES.PROFILE}/${userId}`}>
              <a href={`${ROUTES.PROFILE}/${userId}`}>{username}</a>
            </Link>
          </S.Username>
        </S.User>
        {userId === myUserId && isProfilePost && (
          <S.Danger>
            <Button onClick={handleRemovePost} isRemove typeButton="facebook">
              Удалить
            </Button>
          </S.Danger>
        )}
      </S.Header>
      <S.ContainerPost isProfilePost={isProfilePost}>
        <S.ContainerImage>
          <ImageWrapper onDBClick={handleLikePost} source={image} />
        </S.ContainerImage>
        <S.Wall isProfilePost={isProfilePost}>
          {!isProfilePost && (
            <S.Actions>
              <Text>{favoriteCount}</Text>
              {isFavorite ? (
                <IconHeartFill
                  cursor="pointer"
                  onClick={handleDislikePost}
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
                <MarkFill
                  onClick={handleUnMarkPost}
                  cursor="pointer"
                  marginLeft="auto"
                />
              ) : (
                <Mark
                  onClick={handleMarkPost}
                  cursor="pointer"
                  marginLeft="auto"
                />
              )}
            </S.Actions>
          )}
          <PostCommentList
            disableComments={disableComments}
            comments={commentsIds.map(cId => commentsItems[cId])}
            myUserId={myUserId}
            onDeleteReply={handleRemoveReply}
            onDeleteComment={handleRemoveComment}
            onReplay={handleReplay}
          />
          {isProfilePost && (
            <S.Actions>
              <Text>{favoriteCount}</Text>
              {isFavorite ? (
                <IconHeartFill
                  cursor="pointer"
                  onClick={handleDislikePost}
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
                <MarkFill
                  onClick={handleUnMarkPost}
                  cursor="pointer"
                  marginLeft="auto"
                />
              ) : (
                <Mark
                  onClick={handleMarkPost}
                  cursor="pointer"
                  marginLeft="auto"
                />
              )}
            </S.Actions>
          )}
          {!disableComments && (
            <PostInputComment
              comment={comment}
              $postInput={$postInput as React.RefObject<HTMLInputElement>}
              onChange={handleChangeComment}
              onAdd={handleAddCommentOrReply}
            />
          )}
        </S.Wall>
      </S.ContainerPost>
    </S.Root>
  );
};

export default FeedPost;
