import React, { useCallback, useRef, useState } from "react";

import * as S from "./Feeds.styled";
import { getFeedsAsync } from "src/entities/user/async";
import { IPost } from "src/entities/post/types";
import FeedPost from "components/Feeds/FeedPost";
import { useUser } from "src/entities/user/selectors";
import { IMeta } from "src/entities/root";
import { toNormalize } from "utils/toNormalize";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";
import { setDisLikePost, setLikePost } from "src/entities/post/async";
import Loader from "components/Loader";
import { Colors } from "@types";
import { useIsMounted } from "hooks/useIsMounted";

const Feeds = () => {
  const { id: myUserId } = useUser();
  const [posts, setPosts] = useState<{ [key: string]: IPost }>({});
  const [postsIds, setPostsIds] = useState<string[]>([]);
  const [load, setLoad] = useState(false);
  const isMounted = useIsMounted();
  const $page = useRef(0);
  const $meta = useRef<IMeta>({
    currentPage: 0,
    itemCount: 0,
    itemsPerPage: 0,
    totalItems: 0,
    totalPages: 0
  });

  const handleGetPosts = useCallback(async () => {
    if (
      $page.current + 1 > $meta.current?.totalPages &&
      $meta.current.totalPages
    )
      return;
    setLoad(true);
    $page.current += 1;
    const response = await getFeedsAsync({ page: $page.current, limit: 10 });
    $meta.current = response.meta;
    const normalize = toNormalize(response, "items");
    setPosts(prevState => {
      return { ...prevState, ...normalize.entities.items };
    });
    setPostsIds(prevState => [...prevState, ...normalize.result.items]);
    setLoad(false);
  }, []);

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

  const { setRefElement } = useIntersectionObserver(handleGetPosts);

  return isMounted && $meta.current ? (
    <S.Root>
      {postsIds.map(id => (
        <FeedPost
          isProfilePost={false}
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
          onLikePost={handleLikePost}
          onDislikePost={handleDisLikePost}
          onMark={() => {}}
          onUnMark={() => {}}
        />
      ))}
      <S.Loader ref={setRefElement} />
      {load && (
        <Loader
          color={Colors.instaDefault}
          position="absolute"
          left="50%"
          bottom="20px"
          transform={{ x: "-50%", y: "0" }}
        />
      )}
    </S.Root>
  ) : (
    <Loader
      color={Colors.instaDefault}
      position="absolute"
      left="50%"
      top="50%"
      bottom="20px"
      transform={{ x: "-50%", y: "-50%" }}
    />
  );
};

export default Feeds;
