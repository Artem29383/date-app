import { currentAsync } from "pages/login/model/login";
import { ROUTES } from "@types";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const user = await currentAsync(ctx);

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
        user
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

export { default } from "./settings";
