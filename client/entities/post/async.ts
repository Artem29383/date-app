import { ApiError } from "api/types";
import { Api } from "src/api";
import { root } from "src/entities/root";
import { IPost, PostData, PostsQuery } from "src/entities/post/types";
import { GetServerSidePropsContext } from "next";
import { IPostsState } from "src/entities/post/store";

export const createPostAsync = root.createEffect<
  PostData,
  IPost | null,
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .createPost(data)
    .then(response => response.data)
);

export const getUserPosts = root.createEffect<
  { ctx: GetServerSidePropsContext | undefined; query: PostsQuery },
  IPostsState,
  ApiError<Record<string, unknown>>
>(data =>
  Api(data.ctx)
    .getUserPosts(data.query)
    .then(response => response.data)
);

export const setLikePost = root.createEffect<
  string,
  IPost | null,
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .setLikePost(data)
    .then(response => response.data)
);

export const setDisLikePost = root.createEffect<
  string,
  IPost | null,
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .setDisLikePost(data)
    .then(response => response.data)
);
