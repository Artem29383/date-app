import { root } from "src/entities/root";
import { logout } from "pages/login/model/login";
import { IPost } from "src/entities/post/types";

export const PostsInitialState: Array<IPost> = [];

export const $posts = root
  .createStore<IPost[]>(PostsInitialState)
  .reset(logout);
