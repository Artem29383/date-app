import { FormType } from "pages/register/model/types";
import { IUser } from "src/entities/user/types";
import { ApiError } from "api/types";
import { Api } from "src/api";
import { RouterPush } from "utils/router/router";
import { ROUTES } from "@types";
import Cookies from "js-cookie";
import { root } from "src/entities/root";

export const registerAsync = root.createEffect<
  FormType,
  IUser,
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .signUp(data)
    .then(response => response.data)
);

registerAsync.done.watch(payload => {
  RouterPush(ROUTES.DASHBOARD);
  Cookies.set("token", payload.result.accessToken);
});
