import NewsList from "app/_components/NewsList";
import Person from "app/_components/Person";
import ArticleBody from "components/ArticleBody";
import Container from "components/Container";
import { getProjectBySlug, getTopicBySlug } from "lib/sanity.fetch";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const data = (await getTopicBySlug(params.slug)) || notFound();

  return defineMetadata({
    title: data.title,
    description: data.description,
  });
}

export default async function ProjectPage({ params }: Params) {
  const data = (await getTopicBySlug(params.slug)) || notFound();

  return (
    <>
      <Container prose>
        <h1>{data.title}</h1>
        <p className="lead max-w-prose">{data.description}</p>
      </Container>
      <Container paper prose>
        <ArticleBody
          media={data.image}
          body={data.body}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
          <NewsList type="article" reference={data._id} />
          <NewsList type="publication" reference={data._id} />
        </div>
      </Container>
    </>
  );
}
