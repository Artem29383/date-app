import { GetServerSidePropsContext } from "next";
import { withAuthentication } from "utils/withAuthentication";
import { ROUTES } from "@types";

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   try {
//     return {
//       ...(await withAuthentication(ctx)),
//       // redirect: {
//       //   permanent: false,
//       //   destination: ROUTES.DASHBOARD
//       // }
//     };
//   } catch (error) {
//     return {
//       props: {},
//       redirect: {
//         permanent: false,
//         destination: ROUTES.LOGIN
//       }
//     };
//   }
// };

export { default } from "./login";
