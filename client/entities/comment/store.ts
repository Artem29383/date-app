import { root } from "src/entities/root";
import { logout } from "pages/login/model/login";
import { IComment } from "src/entities/comment/types";
import { createEvent } from "effector";

export type ICommentState = IComment[];

export const CommentsInitialState: ICommentState = [];

export const updateComments = createEvent<IComment[]>();
export const removeComment = createEvent<string>();

export const $comments = root
  .createStore<ICommentState>(CommentsInitialState)
  .reset(logout)
  .on(updateComments, (state, comments) => [...state, ...comments])
  .on(removeComment, (state, id) => state.filter(elem => elem.id !== id));
