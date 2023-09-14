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
    <div>
      <Container prose className="px-4">
        <h1>{title}</h1>
        <p className="lead max-w-prose">{description}</p>
        <div className="my-4 flex gap-4 not-prose">
          <Button as={Link} href="/om-vofo">
            Bli kjent med Vofo
          </Button>
          <Button as={Link} color="secondary" href="/studieforbund">
            Om studieforbund
          </Button>
        </div>
      </Container>
      <Hero banner={banner} />
      <Container className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-8 px-4">
        <div>
          <h2 className="text-crimson-500 text-2xl md:text-3xl font-semibold">
            Aktuelt
          </h2>
          Aktuelt
        </div>
        <div>
          <h2 className="text-crimson-500 text-2xl md:text-3xl font-semibold">
            Kalender
          </h2>
          Kalender
        </div>
      </Container>
    </div>
  );
}
