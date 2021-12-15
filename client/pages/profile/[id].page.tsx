import React, { useState } from "react";

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
import { GetServerSidePropsContext } from "next";
import { withAuthentication } from "utils/withAuthentication";
import { allSettled, Scope, serialize } from "effector";
import {
  getUserPosts,
  setDisLikePost,
  setLikePost
} from "src/entities/post/async";
import { getUserByIdAsync } from "pages/login/model/login";
import { useEvent } from "effector-react";
import { updatePosts } from "src/entities/post/store";
import { getPostComments } from "src/entities/comment/async";

const Profile = () => {
  const [view, setView] = useState<"publication" | "saved">("publication");
  const isClient = useClientRender();
  const [post, setPost] = useState<IPost | undefined>(undefined);
  const data = (usePosts() as unknown) as { posts: IPost[]; counts: number };
  const updatePostEvent = useEvent(updatePosts);
  const { id: myId, avatarUrl: myAvatarUrl } = useUser();
  const { avatarUrl, username, description, email, id } = useUserById();
  const { handleOpen, value: open, handleClose } = useToggle(false);
  const {
    handleOpen: openPost,
    value: show,
    handleClose: closePost
  } = useToggle(false);

  const handleSetPost = async (postIdParam: string) => {
    setPost(data.posts.find(postId => postId.id === postIdParam));
    openPost();
    const comments = await getPostComments({ query: { id: postIdParam } });
    console.info("comments", comments);
  };

  const handleLikePost = async (postId: string) => {
    const response = await setLikePost(postId);
    const readyPost = { ...response, isFavorite: true };
    updatePostEvent(readyPost as IPost);
    setPost(readyPost as IPost);
  };

  const handleDisLikePost = async (postId: string) => {
    const response = await setDisLikePost(postId);
    const readyPost = { ...response, isFavorite: false };
    updatePostEvent(readyPost as IPost);
    setPost(readyPost as IPost);
  };

  return (
    <>
      <S.Root>
        <S.Header>
          <ImageWrapper
            onClick={handleOpen}
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
            </S.Row>
            <S.Row>
              <S.Text>
                <S.Bold>{data.counts}</S.Bold>
                публикаций
              </S.Text>
              <S.Text>
                <S.Bold>83</S.Bold>
                подписчиков
              </S.Text>
              <S.Text>
                <S.Bold>71</S.Bold>
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
          <S.ButtonNavigation
            active={view === "saved"}
            onClick={() => setView("saved")}
          >
            Сохранённое
          </S.ButtonNavigation>
        </S.Navigation>
        <S.Body>
          {data.posts.map(postItem => (
            <Post
              onClick={handleSetPost}
              id={postItem.id}
              url={postItem.avatarUrl}
              key={postItem.id}
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
            onLike={handleLikePost}
            onDisLike={handleDisLikePost}
            isFavorite={post.isFavorite}
            favoriteCount={post.favoritesCount}
            createdAt={post.createdAt}
            description={post.description}
            disableComments={post.disableComments}
            user={{ avatarUrl, username, id }}
            url={post.avatarUrl}
            onClose={closePost}
            open={show}
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

    await allSettled(getUserByIdAsync, {
      scope,
      params: { ctx, id: ctx.query.id as string }
    });

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
