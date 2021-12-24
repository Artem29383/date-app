import React, { useCallback, useRef, useState } from "react";

import * as S from "./Feeds.styled";
import { getFeedsAsync } from "src/entities/user/async";
import { IPost } from "src/entities/post/types";
import FeedPost from "components/Feeds/FeedPost";
import { useUser } from "src/entities/user/selectors";
import { IMeta } from "src/entities/root";
import { toNormalize } from "utils/toNormalize";
import { setDisLikePost, setLikePost } from "src/entities/post/async";
import {
  addCommentToPostAsync,
  removeCommentFromPostAsync
} from "src/entities/comment/async";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";

const Feeds = () => {
  const { id: myUserId } = useUser();
  const [comment, setComment] = useState("");
  const [posts, setPosts] = useState<{ [key: string]: IPost }>({});
  const [postsIds, setPostsIds] = useState<string[]>([]);
  const $page = useRef(0);
  const $meta = useRef<IMeta>({
    currentPage: 0,
    itemCount: 0,
    itemsPerPage: 0,
    totalItems: 0,
    totalPages: 0
  });

  const handleChangeComment = e => {
    setComment(e.target.value);
  };

  const handleGetPosts = useCallback(async () => {
    if (
      $page.current + 1 > $meta.current?.totalPages &&
      $meta.current.totalPages
    )
      return;
    $page.current += 1;
    const response = await getFeedsAsync({ page: $page.current, limit: 10 });
    $meta.current = response.meta;
    const normalize = toNormalize(response, "items");
    setPosts(prevState => {
      return { ...prevState, ...normalize.entities.items };
    });
    setPostsIds(prevState => [...prevState, ...normalize.result.items]);
  }, []);

  const { setRefElement } = useIntersectionObserver(handleGetPosts);

  const handleLikePost = async (postId: string) => {
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

  const handleDisLikePost = async (postId: string) => {
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

  const handleRemoveComment = async (commentId: string, postId: string) => {
    await removeCommentFromPostAsync({ commentId });
    setPosts(prevState => ({
      ...prevState,
      [postId]: {
        ...prevState[postId],
        comments: prevState[postId].comments.filter(com => com.id !== commentId)
      }
    }));
  };

  const handleAddComment = async (postId: string) => {
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
    setComment("");
  };

  return (
    <S.Root>
      {postsIds.map(id => (
        <FeedPost
          isMark={false}
          myUserId={myUserId}
          comments={posts[id].comments}
          disableComments={posts[id].disableComments}
          isFavorite={posts[id].isFavorite}
          favoriteCount={posts[id].favoritesCount}
          userId={posts[id].user.id}
          username={posts[id].user.username}
          userAvatar={posts[id].user.avatarUrl || ""}
          key={id}
          postId={id}
          image={posts[id].avatarUrl}
          comment={comment}
          onChangeComment={handleChangeComment}
          onDislike={handleDisLikePost}
          onLike={handleLikePost}
          onDeleteComment={handleRemoveComment}
          onAddComment={handleAddComment}
        />
      ))}
      {/* @ts-ignore */}
      <S.Loader ref={setRefElement} />
    </S.Root>
  );
};

export default Feeds;
