import { ApiError } from "api/types";
import { Api } from "src/api";
import { root } from "src/entities/root";
import {
  CommentDataReq,
  CommentQuery,
  IComment
} from "src/entities/comment/types";
import { AxiosResponse } from "axios";

export const getPostComments = root.createEffect<
  { query: CommentQuery },
  IComment[],
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .getPostComments(data.query)
    .then(response => response.data)
);

export const addCommentToPostAsync = root.createEffect<
  CommentDataReq,
  IComment,
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .addCommentToPost(data)
    .then(response => response.data)
);

export const removeCommentFromPostAsync = root.createEffect<
  { commentId: string },
  AxiosResponse,
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .removeCommentFromPost(data)
    .then(response => response)
);
