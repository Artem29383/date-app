import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { AuthApi } from "api/authApi";
import config from "@config";
import nookies from "nookies";
import { UserApi } from "api/userApi";
import { PostApi } from "api/postApi";
import { CommentApi } from "api/commentApi";

type ApiReturnType = ReturnType<typeof AuthApi> &
  ReturnType<typeof UserApi> &
  ReturnType<typeof PostApi> &
  ReturnType<typeof CommentApi>;

export const Api = (ctx?: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const instance = axios.create({
    baseURL: config.remoteApiUrl,
    headers: {
      Authorization: `Bearer ${cookies.token}`
    }
  });
  return [AuthApi, UserApi, PostApi, CommentApi].reduce(
    (prev, f) => ({ ...prev, ...f(instance) }),
    {} as ApiReturnType
  );
};
