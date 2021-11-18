import Router from "next/router";

export const RouterPush = (url: string) => {
  // eslint-disable-next-line no-void
  void Router.push(url).then(r => r);
};
