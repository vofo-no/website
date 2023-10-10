import ArticleBody from "components/ArticleBody";
import Container from "components/Container";
import { getPublicationBySlug } from "lib/sanity.fetch";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const data = await getPublicationBySlug(params.slug);

  return defineMetadata({
    title: data?.title,
    description: data?.description,
  });
}

export default async function Page({ params }: Params) {
  const data = (await getPublicationBySlug(params.slug)) || notFound();

  const { title, description, body, toc, image, _updatedAt, publishedAt } =
    data;

  return (
    <>
      <Container prose>
        <h1>{title}</h1>
        <p className="lead max-w-prose">{description}</p>
      </Container>
      <Container paper prose>
        <ArticleBody
          media={image}
          publishedAt={publishedAt}
          updatedAt={_updatedAt}
          body={body}
          toc={toc}
        />
      </Container>
    </>
  );
}
