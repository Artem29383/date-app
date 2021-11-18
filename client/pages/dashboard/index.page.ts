import { currentAsync } from "pages/login/model/login";
import { ROUTES } from "@types";
import { GetServerSidePropsContext } from "next";
import { allSettled, fork } from "effector";
import { root } from "src/entities/root";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const scope = fork(root);
  try {
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

    console.info("SEND", user);
    return {
      props: {
        data: user
      }
    };
  } catch (error) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: ROUTES.LOGIN
      }
    };
  }
};

export { default } from "./dashboard";
