import ArticleBody from "components/ArticleBody";
import Container from "components/Container";
import type { PagePayload } from "types";

export interface AboutPageProps {
  data?: PagePayload | null;
}

export default function AboutPage({ data }: AboutPageProps) {
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
