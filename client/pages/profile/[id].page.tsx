import React, { useEffect, useState } from "react";

import * as S from "./Profile.styled";
import ImageWrapper from "components/ImageWrapper";
import { useUser, useUserById } from "src/entities/user/selectors";
import Button from "components/Button";
import { ROUTES } from "@types";
import { useToggle } from "hooks/useToggle";
import Portal from "components/Portal/Portal";
import WrapperModalChangeAvatar from "components/Modal/ModalChangeAvatar/WrapperModalChangeAvatar";
import { useClientRender } from "hooks/useClientRender";
import { usePosts } from "src/entities/post/selectors";
import { IPost, PostsQuery } from "src/entities/post/types";
import Post from "components/Post";
import ModalPost from "components/Modal/ModalPost";
import { withAuthentication } from "utils/withAuthentication";
import { allSettled, Scope, serialize } from "effector";
import {
  getUserBookmarks,
  getUserPosts,
  removePostAsync,
  setBookmarkPost,
  setDisLikePost,
  setLikePost,
  setUnBookmarkPost
} from "src/entities/post/async";
import { getUserByIdAsync } from "pages/login/model/login";
import { useEvent } from "effector-react";
import {
  removePost,
  updatePostAll,
  updatePosts
} from "src/entities/post/store";
import {
  addCommentToPostAsync,
  getPostComments,
  removeCommentFromPostAsync
} from "src/entities/comment/async";
import { useComments } from "src/entities/comment/selectors";
import {
  addComments,
  removeComment,
  updateComments
} from "src/entities/comment/store";
import { useRouter } from "next/router";
import { followUserAsync, unfollowUserAsync } from "src/entities/user/async";
import {
  updateUserByIdFollowing,
  updateUserByIdFollowingCount
} from "src/entities/user/store";
import ModalFollowers from "components/Modal/ModalFollowers";
import { GetServerSidePropsContext } from "next";

const Profile = () => {
  const { query } = useRouter();
  const [request, setRequest] = useState<"followers" | "sub">("followers");
  const [view, setView] = useState<"publication" | "saved">("publication");
  const isClient = useClientRender();
  const [post, setPost] = useState<IPost | undefined>(undefined);
  const comments = useComments();
  const data = (usePosts() as unknown) as { posts: IPost[]; counts: number };
  const updatePostEvent = useEvent(updatePosts);
  const updatePostsAllEvent = useEvent(updatePostAll);
  const removePostEvent = useEvent(removePost);
  const updateCommentsEvent = useEvent(updateComments);
  const addCommentsEvent = useEvent(addComments);
  const removeCommentEvent = useEvent(removeComment);
  const updateUserByIdEvent = useEvent(updateUserByIdFollowing);
  const updateUserByIdFollowingCountEvent = useEvent(
    updateUserByIdFollowingCount
  );
  const { id: myId, avatarUrl: myAvatarUrl, username: myUserName } = useUser();
  const {
    avatarUrl,
    username,
    description,
    email,
    id,
    isFollow,
    followersCount,
    subsCount
  } = useUserById();
  const { handleOpen, value: open, handleClose } = useToggle(false);
  const {
    handleOpen: handleFollowers,
    value: showModalFollowers,
    handleClose: handleFollowersClose
  } = useToggle(false);
  const {
    handleOpen: openPost,
    value: show,
    handleClose: closePost
  } = useToggle(false);

  const handleFollow = async () => {
    const response = await followUserAsync({ userFollowingId: id });
    if (response) {
      updateUserByIdEvent(true);
      updateUserByIdFollowingCountEvent(followersCount + 1);
    }
  };

  const handleUnFollow = async () => {
    const response = await unfollowUserAsync({ userFollowingId: id });
    if (response) {
      updateUserByIdEvent(false);
      updateUserByIdFollowingCountEvent(followersCount - 1);
    }
  };

  useEffect(() => {
    if (view === "saved") {
      (async () => {
        const response = await getUserBookmarks({
          query: { id: query.id as string }
        });
        updatePostsAllEvent(response.posts);
      })();
    }
    if (view === "publication") {
      (async () => {
        const response = await getUserPosts({
          query: { id: query.id as string }
        });
        updatePostsAllEvent(response.posts);
      })();
    }
  }, [query, updatePostEvent, updatePostsAllEvent, view]);

  const handleSetPost = async (postIdParam: string) => {
    setPost(data.posts.find(postId => postId.id === postIdParam));
    openPost();
    updateCommentsEvent(await getPostComments({ query: { id: postIdParam } }));
  };

  const handleAddComment = async (postId: string, comment: string) => {
    const response = await addCommentToPostAsync({
      postId,
      text: comment
    });

    const postElement = data.posts.find(postElem => postElem.id === postId);
    addCommentsEvent([response]);

    if (!postElement) return;
    postElement.commentCount++;
    updatePostEvent(postElement);
  };

  const handleRemovePost = async (postId: string) => {
    await removePostAsync({ id: postId });
    closePost();
    setPost(undefined);
    removePostEvent(postId);
  };

  const handleRemoveComment = async (commentId: string) => {
    console.info(comments.find(com => com.id === commentId));
    // await removeCommentFromPostAsync({ commentId });
    // removeCommentEvent(commentId);
  };

  const handleLikePost = async (postId: string) => {
    const response = await setLikePost(postId);
    const readyPost = {
      ...response,
      isFavorite: true,
      isBookmark: post?.isBookmark
    };
    updatePostEvent(readyPost as IPost);
    setPost(readyPost as IPost);
  };

  const handleBookmarkPost = async (postId: string) => {
    const response = await setBookmarkPost(postId);
    const readyPost = {
      ...response,
      isBookmark: true,
      isFavorite: post?.isFavorite
    };
    updatePostEvent(readyPost as IPost);
    setPost(readyPost as IPost);
  };

  const handleRemoveBookmarkPost = async (postId: string) => {
    const response = await setUnBookmarkPost(postId);
    const readyPost = {
      ...response,
      isBookmark: false,
      isFavorite: post?.isFavorite
    };
    updatePostEvent(readyPost as IPost);
    setPost(readyPost as IPost);
  };

  const handleDisLikePost = async (postId: string) => {
    const response = await setDisLikePost(postId);
    const readyPost = {
      ...response,
      isFavorite: false,
      isBookmark: post?.isBookmark
    };
    updatePostEvent(readyPost as IPost);
    setPost(readyPost as IPost);
  };

  return (
    <>
      <S.Root>
        <S.Header>
          <ImageWrapper
            onClick={myId === id ? handleOpen : () => {}}
            flexShrink={0}
            margin="0 90px 0 30px"
            height={150}
            width={150}
            overflow="hidden"
            borderRadius="50%"
            source={(myId === id ? myAvatarUrl : avatarUrl) || ""}
          />
          <S.Content>
            <S.Row>
              <S.Name>{username}</S.Name>
              {myId === id && (
                <Button link={ROUTES.SETTINGS_PROFILE} typeButton="facebook">
                  Редактировать профиль
                </Button>
              )}
              {myId !== id && !isFollow && (
                <Button onClick={handleFollow} typeButton="facebook">
                  Подписаться
                </Button>
              )}
              {myId !== id && isFollow && (
                <Button onClick={handleUnFollow} typeButton="facebook">
                  Отписаться
                </Button>
              )}
            </S.Row>
            <S.Row>
              <S.Text>
                <S.Bold>{data.counts}</S.Bold>
                публикаций
              </S.Text>
              <S.Text
                onClick={() => {
                  setRequest("followers");
                  handleFollowers();
                }}
              >
                <S.Bold>{followersCount}</S.Bold>
                подписчиков
              </S.Text>
              <S.Text
                onClick={() => {
                  setRequest("sub");
                  handleFollowers();
                }}
              >
                <S.Bold>{subsCount}</S.Bold>
                подписок
              </S.Text>
            </S.Row>
            <S.Row>
              <S.Bold>{description}</S.Bold>
            </S.Row>
          </S.Content>
        </S.Header>
        <S.Navigation>
          <S.ButtonNavigation
            active={view === "publication"}
            onClick={() => setView("publication")}
          >
            Публикации
          </S.ButtonNavigation>
          {myId === id && (
            <S.ButtonNavigation
              active={view === "saved"}
              onClick={() => setView("saved")}
            >
              Сохранённое
            </S.ButtonNavigation>
          )}
        </S.Navigation>
        <S.Body>
          {data.posts.map(postItem => (
            <Post
              onClick={handleSetPost}
              id={postItem.id}
              url={postItem.avatarUrl}
              key={postItem.id}
              commentCount={postItem.commentCount}
            />
          ))}
        </S.Body>
      </S.Root>
      {isClient && (
        <Portal id="modalChangeAvatar">
          <WrapperModalChangeAvatar
            onClose={handleClose}
            open={open}
            email={email}
          />
        </Portal>
      )}
      {isClient && post && (
        <Portal id="modalPost">
          <ModalPost
            postId={post.id}
            myUserId={myId}
            onLike={handleLikePost}
            onDisLike={handleDisLikePost}
            comments={comments}
            isFavorite={post.isFavorite}
            isMark={post.isBookmark}
            favoriteCount={post.favoritesCount}
            createdAt={post.createdAt}
            description={post.description}
            disableComments={post.disableComments}
            user={{
              avatarUrl: post.user.avatarUrl,
              username: post.user.username,
              id: post.user.id
            }}
            url={post.avatarUrl}
            onClose={closePost}
            onMark={handleBookmarkPost}
            onUnMark={handleRemoveBookmarkPost}
            onRemovePost={handleRemovePost}
            open={show}
          />
        </Portal>
      )}
      {isClient && (
        <Portal id="followers">
          <ModalFollowers
            userId={id}
            request={request}
            label={request === "followers" ? "Подписчики" : "Подписки"}
            open={showModalFollowers}
            onClose={handleFollowersClose}
          />
        </Portal>
      )}
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const scope = (await withAuthentication(ctx, false)) as Scope;

    await allSettled(getUserPosts, {
      scope,
      params: { ctx, query: (ctx.query as unknown) as PostsQuery }
    });

    const user = await allSettled(getUserByIdAsync, {
      scope,
      params: { ctx, id: ctx.query.id as string }
    });

    if (!user.value) {
      ctx.res.writeHead(404, { Location: ROUTES.DASHBOARD });
      ctx.res.end();
    }

    return {
      props: {
        store: serialize(scope)
      }
    };
  } catch (error) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: ROUTES.LOGIN
      }
    };
  }
};

export default Profile;
