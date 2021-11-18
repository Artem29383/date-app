import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import theme from "styles/theme";
import TranslateProvider from "src/locales/library/Provider";
import common from "src/locales/common";
import Normalize from 'styles/normalize';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TranslateProvider locales={common}>
      <Normalize />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </TranslateProvider>
  );
}

export default MyApp;
