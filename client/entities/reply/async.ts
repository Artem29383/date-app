import { ApiError } from "api/types";
import { Api } from "src/api";
import { root } from "src/entities/root";
import { IReply, ReplyQuery } from "src/entities/reply/types";
import { AxiosResponse } from "axios";

export const getCommentReplays = root.createEffect<
  { query: ReplyQuery },
  IReply[],
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .getCommentReplies(data.query)
    .then(response => response.data)
);

export const addReplyToCommentAsync = root.createEffect<
  ReplyQuery,
  IReply,
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .addReplyToComment(data)
    .then(response => response.data)
);

export const removeReplyFromCommentAsync = root.createEffect<
  { replyId: string; commentId: string },
  AxiosResponse,
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .removeReplyFromComment(data)
    .then(response => response)
);
