import ArticleBody from "components/ArticleBody";
import Container from "components/Container";
import { getPageBySlug } from "lib/sanity.fetch";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Params {
  params: { slug: string[] };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const data = await getPageBySlug(params.slug.join("/"));

  return defineMetadata({
    title: data?.title,
    description: data?.description,
  });
}

export default async function Page({ params }: Params) {
  const slug = params.slug.join("/");
  const data = (await getPageBySlug(slug)) || notFound();

  const { title, description, body, toc } = data;

  return (
    <Container paper prose>
      <h1>{title}</h1>
      <p className="lead max-w-prose">{description}</p>
      <ArticleBody media={"media"} meta={"meta"} body={body} toc={toc} />
    </Container>
  );
}
