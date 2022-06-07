import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface PageItem {
  name: string;
  href: string;
}

export interface LayoutProps {
  navigation: {
    categories: Array<{
      name: string;
      sections: Array<{
        name: string;
        items: Array<PageItem>;
      }>;
    }>;
    pages: Array<PageItem>;
  };
}

export default function Layout({
  children,
  navigation = { categories: [], pages: [] },
}: PropsWithChildren<LayoutProps>) {
  return (
    <>
      <Header navigation={navigation} />
      {children}
      <Footer />
    </>
  );
}
