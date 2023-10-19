import NewsList from "app/_components/NewsList";
import Button from "components/Button";
import Container from "components/Container";
import Hero from "components/Hero";
import Link from "next/link";
import type { HomePagePayload } from "types";

export interface HomePageProps {
  data: HomePagePayload | null;
}

export default function HomePage({ data }: HomePageProps) {
  const { title, description, banner } = data ?? {};

  return (
    <>
      <Container prose>
        <h1>{title}</h1>
        <p className="lead max-w-prose">{description}</p>
        <div className="my-4 flex gap-2 sm:gap-4 -mx-1 not-prose">
          <Button as={Link} href="/om-vofo">
            Bli kjent med Vofo
          </Button>
          <Button as={Link} color="secondary" href="/studieforbund">
            Om studieforbund
          </Button>
        </div>
      </Container>
      <Hero banner={banner} />
      <Container prose>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <NewsList type="article" />
          <NewsList type="publication" />
        </div>
      </Container>
    </>
  );
}
