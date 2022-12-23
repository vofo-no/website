import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { LayoutProps } from "../../../components/Layout";
import NewsArticle from "../../../components/NewsArticle";
import {
  getAllNewsItemsSlugsQuery,
  getNewsItemQuery,
  getNavigation,
  NewsItemType,
  ArticleNewsItem,
} from "../../../lib/sanity.api";
import { client } from "../../../lib/sanity.client";

const type = "article";
type ItemType = ArticleNewsItem;

interface StaticPathParams extends ParsedUrlQuery {
  slug: string;
}

interface PageProps {
  item: NonNullable<NewsItemType>;
}

const ArticlePage: NextPage<PageProps> = ({ item }) => {
  return (
    <>
      <div className="max-w-6xl mx-auto my-4 px-3 sm:px-4 lg:px-8">
        <NewsArticle item={item} />
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
  const item = await client.fetch<ItemType>(getNewsItemQuery, {
    type,
    slug: params.slug,
  });

  return { props: { preview, layout, item }, revalidate: 10 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch<Array<ItemType>>(getAllNewsItemsSlugsQuery, {
    type,
  });

  return {
    paths: slugs.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
};

export default ArticlePage;
