import { createEffect } from "effector";
import { FormType } from "pages/register/model/types";
import { IUser } from "src/entities/user/types";
import { ApiError } from "api/types";
import { $user, UserInitialState } from "src/entities/user/store";
import { Api } from "src/api";

export const registerAsync = createEffect<
  FormType,
  IUser,
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .signUp(data)
    .then(response => response.data)
);

registerAsync.done.watch(payload => {
  console.log("REDIRECT TO MAIN", payload);
});

$user.on(registerAsync.doneData, (_, payload) => ({
  ...UserInitialState,
  ...payload
}));
