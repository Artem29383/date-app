import { root } from "src/entities/root";
import { logout } from "pages/login/model/login";
import { IComment } from "src/entities/comment/types";
import { getPostComments } from "src/entities/comment/async";

export type ICommentState = IComment[];

export const CommentsInitialState: ICommentState = [];

export const $comments = root
  .createStore<ICommentState>(CommentsInitialState)
  .reset(logout)
  .on(getPostComments.doneData, (state, comments) => ({
    ...state,
    ...comments
  }));
