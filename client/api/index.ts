import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { AuthApi } from "api/authApi";
import config from "@config";
import nookies from "nookies";
import { UserApi } from "api/userApi";
import { PostApi } from "api/postApi";

type ApiReturnType = ReturnType<typeof AuthApi> &
  ReturnType<typeof UserApi> &
  ReturnType<typeof PostApi>;

export const Api = (ctx?: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const instance = axios.create({
    baseURL: config.remoteApiUrl,
    headers: {
      Authorization: `Bearer ${cookies.token}`
    }
  });
  return [AuthApi, UserApi, PostApi].reduce(
    (prev, f) => ({ ...prev, ...f(instance) }),
    {} as ApiReturnType
  );
};
