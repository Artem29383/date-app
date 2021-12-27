import React, { useCallback, useRef, useState } from "react";

import * as S from "./Feeds.styled";
import { getFeedsAsync } from "src/entities/user/async";
import { IPost } from "src/entities/post/types";
import FeedPost from "components/Feeds/FeedPost";
import { useUser } from "src/entities/user/selectors";
import { IMeta } from "src/entities/root";
import { toNormalize } from "utils/toNormalize";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";

const Feeds = () => {
  const { id: myUserId } = useUser();
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
          setPosts={setPosts}
        />
      ))}
      {/* @ts-ignore */}
      <S.Loader ref={setRefElement} />
    </S.Root>
  );
};

export default Feeds;
