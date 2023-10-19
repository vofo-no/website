import NewsList from "app/_components/NewsList";
import Person from "app/_components/Person";
import ArticleBody from "components/ArticleBody";
import Container from "components/Container";
import { getProjectBySlug } from "lib/sanity.fetch";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const data = (await getProjectBySlug(params.slug)) || notFound();

  return defineMetadata({
    title: data.title,
    description: data.description,
  });
}

export default async function ProjectPage({ params }: Params) {
  const data = (await getProjectBySlug(params.slug)) || notFound();

  return (
    <>
      <Container prose lang={data.locale}>
        <h1>{data.title}</h1>
        <p className="lead max-w-prose">{data.description}</p>
      </Container>
      <Container paper prose lang={data.locale}>
        <ArticleBody
          media={data.image}
          body={data.body}
          locale={data.locale}
          aside={
            <>
              {data.contacts?.map((person) => (
                <Person key={person._ref} id={person._ref} showContactInfo />
              ))}
            </>
          }
        />
      </Container>
      <Container prose>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <NewsList type="article" reference={data._id} locale={data.locale} />
          <NewsList
            type="publication"
            reference={data._id}
            locale={data.locale}
          />
        </div>
      </Container>
    </>
  );
}
