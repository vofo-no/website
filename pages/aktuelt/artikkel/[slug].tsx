import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { LayoutProps } from "../../../components/Layout";
import NewsArticle from "../../../components/NewsArticle";
import {
  getAllNewsItemsSlugs,
  getNewsItem,
  getNavigation,
  NewsItemType,
} from "../../../lib/sanity.api";

const typeName = "article";

interface StaticPathParams extends ParsedUrlQuery {
  slug: string;
}

interface PageProps {
  item: NonNullable<NewsItemType>;
}

const ArticlePage: NextPage<PageProps> = ({ item }) => {
  return (
    <>
      <div className="max-w-6xl mx-auto my-4 px-2 sm:px-4 lg:px-8">
        <NewsArticle
          item={item}
          aside={<>[Plass til kontaktpersoner og relatert innhold]</>}
        />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps,
  StaticPathParams
> = async ({ params, preview = false }) => {
  if (!params || !params.slug) return { notFound: true };

  const navigation = await getNavigation(preview);
  const layout: LayoutProps = { navigation };
  const item = await getNewsItem(typeName, params.slug, preview);

  return { props: { preview, layout, item }, revalidate: 10 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllNewsItemsSlugs(typeName, false);
  return {
    paths: slugs.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
};

export default ArticlePage;
