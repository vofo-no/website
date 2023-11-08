import ArticleBody from "components/ArticleBody";
import Container from "components/Container";
import { getPageBySlug } from "lib/sanity.fetch";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageBySlug("personvern");

  return defineMetadata({
    title: data?.title,
    description: data?.description,
  });
}

export default async function Page() {
  const data = (await getPageBySlug("personvern")) || notFound();

  const { title, description, body, toc, _updatedAt } = data ?? {};

  return (
    <>
      <Container prose>
        <h1>{title}</h1>
        <p className="lead max-w-prose">{description}</p>
      </Container>
      <Container paper prose>
        <ArticleBody body={body} toc={toc} updatedAt={_updatedAt} />
      </Container>
    </>
  );
}
