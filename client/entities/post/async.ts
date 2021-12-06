import { ApiError } from "api/types";
import { Api } from "src/api";
import { root } from "src/entities/root";
import { IPost, PostData } from "src/entities/post/types";

export const createPostAsync = root.createEffect<
  PostData,
  IPost | null,
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .createPost(data)
    .then(response => response.data)
);
