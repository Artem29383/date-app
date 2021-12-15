import { root } from "src/entities/root";
import { logout } from "pages/login/model/login";
import { IPost } from "src/entities/post/types";
import { getUserPosts } from "src/entities/post/async";
import { createEvent } from "effector";

export interface IPostsState {
  posts: IPost[];
  counts: number;
}

export const PostsInitialState: IPostsState = {
  posts: [],
  counts: 0
};

export const updatePosts = createEvent<IPost>();

export const $posts = root
  .createStore<IPostsState>(PostsInitialState)
  .reset(logout)
  .on(getUserPosts.doneData, (state, posts) => ({ ...state, ...posts }))
  .on(updatePosts, ({ posts, counts }, payload) => ({
    posts: posts.map(post => (post.id === payload.id ? { ...payload } : post)),
    counts
  }));
