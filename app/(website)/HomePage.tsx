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
      <Container prose>
        <h2 className="text-crimson-500 !mt-0 !pt-0">Aktuelt</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>[todo]</div>
          <div>[todo]</div>
        </div>
      </Container>
    </>
  );
}
