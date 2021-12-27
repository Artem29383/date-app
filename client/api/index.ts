import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { AuthApi } from "api/authApi";
import config from "@config";
import nookies, { parseCookies } from "nookies";
import { UserApi } from "api/userApi";
import { PostApi } from "api/postApi";
import { CommentApi } from "api/commentApi";
import { ReplyApi } from "api/replyApi";

type ApiReturnType = ReturnType<typeof AuthApi> &
  ReturnType<typeof UserApi> &
  ReturnType<typeof PostApi> &
  ReturnType<typeof CommentApi> &
  ReturnType<typeof ReplyApi>;

export const Api = (ctx?: GetServerSidePropsContext) => {
  const cookies = ctx ? nookies.get(ctx) : parseCookies();
  const instance = axios.create({
    baseURL: config.remoteApiUrl,
    headers: {
      Authorization: `Bearer ${cookies.token}`
    }
  });
  return [AuthApi, UserApi, PostApi, CommentApi, ReplyApi].reduce(
    (prev, f) => ({ ...prev, ...f(instance) }),
    {} as ApiReturnType
  );
};
