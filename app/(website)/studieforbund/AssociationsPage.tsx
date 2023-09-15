import ArticleBody from "components/ArticleBody";
import Card from "components/Card";
import Container from "components/Container";
import type { AssociationsPagePayload } from "types";

import QuickStats from "./QuickStats";

export interface AssociationsPageProps {
  data: AssociationsPagePayload | null;
}

export default function AssociationsPage({ data }: AssociationsPageProps) {
  const { description, organizations, body, toc } = data ?? {};

  return (
    <div>
      <Container prose className="px-4 md:flex md:gap-8">
        <div className="grow">
          <h1>Studieforbund</h1>
          <p className="lead max-w-prose">{description}</p>
        </div>
        <QuickStats />
      </Container>
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {organizations?.map((item) => (
          <Card
            key={item._id}
            title={item.name}
            image={item.logo}
            imgPadding
            layout="left"
            href={item._id}
          >
            <p>{item.description}</p>
          </Card>
        ))}
      </Container>
      <Container paper prose>
        <ArticleBody body={body} toc={toc} />
      </Container>
    </div>
  );
}
