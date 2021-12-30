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
export const removePostCommentCountById = createEvent<{
  id: string;
  diff: number;
}>();
export const updatePostAll = createEvent<IPost[]>();
export const removePost = createEvent<string>();

export const addPost = createEvent<IPost>();

export const $posts = root
  .createStore<IPostsState>(PostsInitialState)
  .reset(logout)
  .on(getUserPosts.doneData, (state, posts) => ({ ...state, ...posts }))
  .on(updatePostAll, (state, bookmarks) => ({
    posts: bookmarks,
    counts: state.counts
  }))
  .on(updatePosts, ({ posts, counts }, payload) => ({
    posts: posts.map(post => (post.id === payload.id ? { ...payload } : post)),
    counts
  }))
  .on(addPost, (state, payload) => ({
    ...state,
    posts: [payload, ...state.posts]
  }))
  .on(removePost, (state, id) => ({
    posts: state.posts.filter(elem => elem.id !== id),
    counts: state.counts - 1
  }))
  .on(removePostCommentCountById, (state, payload) => ({
    posts: state.posts.map(p =>
      p.id === payload.id
        ? { ...p, commentCount: p.commentCount - payload.diff }
        : p
    ),
    counts: state.counts
  }));
