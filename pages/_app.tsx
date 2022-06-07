import "../styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { layout = { categories: [], pages: [] } } = pageProps;
  const getLayout =
    Component.getLayout ?? ((page) => <Layout {...layout}>{page}</Layout>);

  return getLayout(<Component {...pageProps} />);
}
