import { createEffect } from "effector";
import { FormType } from "pages/register/model/types";
import { IUser } from "src/entities/user/types";
import { ApiError } from "api/types";
import { Api } from "src/api";
import { RouterPush } from "utils/router/router";
import { ROUTES } from "@types";

export const registerAsync = createEffect<
  FormType,
  IUser,
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .signUp(data)
    .then(response => response.data)
);

registerAsync.done.watch(() => {
  RouterPush(ROUTES.LOGIN);
});
