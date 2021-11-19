import "../styles/globals.css";
import { AppProps } from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import TranslateProvider from "src/locales/library/Provider";
import common from "src/locales/common";
import Normalize from "styles/normalize";
import { Provider as EffectorProvider } from "effector-react/ssr";
import { fork } from "effector";
import { root } from "src/entities/root";

function MyApp({ Component, pageProps }: AppProps) {
  const scope = fork(root, { values: pageProps.store });

  return (
    <EffectorProvider value={scope}>
      <TranslateProvider locales={common}>
        <Normalize />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </TranslateProvider>
    </EffectorProvider>
  );
}

export default MyApp;
