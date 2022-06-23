import "../styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Layout from "../components/Layout";
import Head from "next/head";

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

  return getLayout(
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#7c031f" />
        <meta name="msapplication-TileColor" content="#7c031f" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "nb_NO",
          url: "https://www.vofo.no/",
          site_name: "Voksenopplæringsforbundet",
        }}
        twitter={{
          site: "@VOFOnorge",
          cardType: "summary",
        }}
        defaultTitle="Voksenopplæringsforbundet"
      />
      <Component {...pageProps} />
    </>
  );
}
