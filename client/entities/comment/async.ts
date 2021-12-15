import { ApiError } from "api/types";
import { Api } from "src/api";
import { root } from "src/entities/root";
import { CommentQuery, IComment } from "src/entities/comment/types";

export const getPostComments = root.createEffect<
  { query: CommentQuery },
  IComment[],
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .getPostComments(data.query)
    .then(response => response.data)
);
