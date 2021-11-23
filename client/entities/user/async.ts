import { ApiError } from "api/types";
import { Api } from "src/api";
import { IUser } from "src/entities/user/types";
import { root } from "src/entities/root";

export const uploadImageAsync = root.createEffect<
  { file: File | "destroy"; email: string },
  IUser | null,
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .uploadPhoto(data)
    .then(response => response.data)
);
