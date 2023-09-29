import Card from "components/Card";
import Container from "components/Container";
import { getAllActiveCounties } from "lib/sanity.fetch";
import { resolveHref } from "lib/sanity.links";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fylker",
};

export default async function FylkerPage() {
  const counties = await getAllActiveCounties();

  return (
    <Container prose>
      <h1>Fylker</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 not-prose">
        {counties.map((county) => (
          <Card
            href={resolveHref("county", county.slug)!}
            key={county._id}
            title={county.name}
            image={county.image}
          >
            {county.description}
          </Card>
        ))}
      </div>
    </Container>
  );
}
