import { ApiError } from "api/types";
import { Api } from "src/api";
import { ISearchUserDto, IUser, IUserUpdate } from "src/entities/user/types";
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

export const updateUserAsync = root.createEffect<
  IUserUpdate,
  IUser | null,
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .updateUser(data)
    .then(response => response.data)
);

export const fetchUsersBySearchAsync = root.createEffect<
  ISearchUserDto,
  { users: IUser[]; counts: number },
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .getSearchUsers(data)
    .then(response => response)
);

export const followUserAsync = root.createEffect<
  { userFollowingId: string },
  any,
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .followUser(data.userFollowingId)
    .then(response => response)
);

export const unfollowUserAsync = root.createEffect<
  { userFollowingId: string },
  any,
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .unfollowUser(data.userFollowingId)
    .then(response => response)
);
