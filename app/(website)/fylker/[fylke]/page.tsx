import NewsList from "app/_components/NewsList";
import Person from "app/_components/Person";
import QuickStats from "app/(website)/studieforbund/QuickStats";
import ArticleBody from "components/ArticleBody";
import Container from "components/Container";
import { getCountyBySlug } from "lib/sanity.fetch";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Params {
  params: { fylke: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const data = (await getCountyBySlug(params.fylke)) || notFound();

  return defineMetadata({
    title: data.name,
    description: data.description,
  });
}

export default async function FylkePage({ params }: Params) {
  const data = (await getCountyBySlug(params.fylke)) || notFound();

  return (
    <>
      <Container prose className="md:flex md:gap-8">
        <div className="grow">
          <h1>{data.name}</h1>
          <p className="lead max-w-prose">{data.description}</p>
        </div>
        <QuickStats param={params.fylke} locale={data.locale} />
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
