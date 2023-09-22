import ArticleBody from "components/ArticleBody";
import Container from "components/Container";
import { getPageBySlug } from "lib/sanity.fetch";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageBySlug("om-vofo");

  return defineMetadata({
    title: data?.title,
    description: data?.description,
  });
}

export default async function Page() {
  const data = (await getPageBySlug("om-vofo")) || notFound();

  const { title, description, body, toc } = data ?? {};

  return (
    <div>
      <Container prose className="px-4 md:flex md:gap-4">
        <div className="grow">
          <h1>{title}</h1>
          <p className="lead max-w-prose">{description}</p>
        </div>
      </Container>
      <Container paper prose>
        <ArticleBody body={body} toc={toc} />
      </Container>
    </div>
  );
}
