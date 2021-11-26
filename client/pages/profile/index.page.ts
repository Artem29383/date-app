import { ROUTES } from "@types";
import { GetServerSidePropsContext } from "next";
import { withAuthentication } from "utils/withAuthentication";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return {
      ...(await withAuthentication(ctx))
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

export { default } from "./profile";
