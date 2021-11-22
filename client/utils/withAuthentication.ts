import { allSettled, fork, serialize } from "effector";
import { root } from "src/entities/root";
import { currentAsync } from "pages/login/model/login";
import { ROUTES } from "@types";
import { GetServerSidePropsContext } from "next";

export const withAuthentication = async (ctx: GetServerSidePropsContext) => {
  const scope = fork(root);
  const res = await allSettled(currentAsync, { scope, params: ctx });
  const user = res.value;

  if (!user) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: ROUTES.LOGIN
      }
    };
  }

  return {
    props: {
      store: serialize(scope)
    }
  };
};
