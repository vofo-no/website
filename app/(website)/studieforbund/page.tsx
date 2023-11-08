import ArticleBody from "components/ArticleBody";
import Container from "components/Container";
import { getPageBySlug } from "lib/sanity.fetch";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import QuickStats from "./QuickStats";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageBySlug("studieforbund");

  return defineMetadata({
    title: data?.title,
    description: data?.description,
  });
}

export default async function Page() {
  const data = (await getPageBySlug("studieforbund")) || notFound();

  const { title, description, body, toc, _updatedAt } = data ?? {};

  return (
    <>
      <Container prose className="md:flex md:gap-8">
        <div className="grow">
          <h1>{title}</h1>
          <p className="lead max-w-prose">{description}</p>
        </div>
        <QuickStats />
      </Container>

      <Container prose></Container>
      <Container paper prose>
        <ArticleBody body={body} toc={toc} updatedAt={_updatedAt} />
      </Container>
    </>
  );
}
