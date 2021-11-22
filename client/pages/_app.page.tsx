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
import Application from "layouts/Application";
import { useRouter } from "next/router";
import { ROUTES } from "@types";
import Container from "layouts/Container";
import Settings from "layouts/Settings";

function MyApp({ Component, pageProps }: AppProps) {
  const scope = fork(root, { values: pageProps.store });
  const { asPath } = useRouter();

  const auth: string[] = [ROUTES.LOGIN, ROUTES.REGISTRATION];
  const settings: string[] = [
    ROUTES.SETTINGS_PROFILE,
    ROUTES.SETTINGS_PASSWORD
  ];
  const main: string[] = [ROUTES.DASHBOARD];

  return (
    <EffectorProvider value={scope}>
      <TranslateProvider locales={common}>
        <Normalize />
        <ThemeProvider theme={theme}>
          <Application>
            <Container>
              {main.includes(asPath) && <Component {...pageProps} />}
              {settings.includes(asPath) && (
                <Settings>
                  <Component {...pageProps} />
                </Settings>
              )}
            </Container>
            {auth.includes(asPath) && <Component {...pageProps} />}
          </Application>
        </ThemeProvider>
      </TranslateProvider>
    </EffectorProvider>
  );
}

export default MyApp;
