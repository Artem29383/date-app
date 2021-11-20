import { createEffect } from "effector";
import { IUser } from "src/entities/user/types";
import { ApiError } from "api/types";
import { FormTypeLogin } from "pages/login/model/types";
import { RouterPush } from "utils/router/router";
import { ROUTES } from "@types";
import { Api } from "src/api";
import Cookies from "js-cookie";
import { GetServerSidePropsContext } from "next";
import { root } from "src/entities/root";

export const loginAsync = createEffect<
  FormTypeLogin,
  IUser,
  ApiError<Record<string, unknown>>
>(data =>
  Api()
    .signIn(data)
    .then(response => response.data)
);

loginAsync.done.watch(payload => {
  RouterPush(ROUTES.DASHBOARD);
  Cookies.set("token", payload.result.accessToken);
});

export const currentAsync = root.createEffect<
  GetServerSidePropsContext | undefined,
  IUser | null,
  ApiError<Record<string, unknown>>
>(ctx =>
  Api(ctx)
    .getCurrentUser()
    .then(response => response)
);
