import NewsList from "app/_components/NewsList";
import Person from "app/_components/Person";
import QuickStats from "app/(website)/studieforbund/QuickStats";
import ArticleBody from "components/ArticleBody";
import Container from "components/Container";
import { getCountyBySlug } from "lib/sanity.fetch";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";

interface Params {
  params: { fylke: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const data = await getCountyBySlug(params.fylke);

  return defineMetadata({
    title: data.name,
    description: data.description,
  });
}

export default async function FylkePage({ params }: Params) {
  const data = await getCountyBySlug(params.fylke);

  return (
    <>
      <Container prose className="md:flex md:gap-8">
        <div className="grow">
          <h1>{data.name}</h1>
          <p className="lead max-w-prose">{data.description}</p>
        </div>
        <QuickStats param={params.fylke} />
      </Container>
      <Container paper prose>
        <ArticleBody
          media={data.image}
          body={data.body}
          aside={
            <>
              {data.contacts?.map((person) => (
                <Person key={person._ref} id={person._ref} />
              ))}
            </>
          }
        />
      </Container>
      <Container prose>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="mt-0">Aktuelt</h2>
            <NewsList type="article" reference={data._id} />
          </div>
          <div>
            <h2 className="mt-0">Dokumenter</h2>
            <NewsList type="publication" reference={data._id} />
          </div>
        </div>
      </Container>
    </>
  );
}
