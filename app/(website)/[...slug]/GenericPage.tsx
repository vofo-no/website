import Container from "components/Container";
import TextBody from "components/TextBody";
import Toc from "components/Toc";
import type { PagePayload } from "types";

export interface GenericPageProps {
  data?: PagePayload | null;
}

export default function GenericPage({ data }: GenericPageProps) {
  const { title, description, body, toc } = data ?? {};
  const makeToc = toc && toc.length > 2;

  return (
    <div>
      <Container paper prose>
        <h1>{title}</h1>
        <p className="lead max-w-prose">{description}</p>
        <div className="grid md:grid-cols-3 gap-x-4">
          <div className="md:col-span-2 md:row-span-2">media</div>
          <div className="border-gray-200 border-y md:border-y-0 mb-4">
            meta
          </div>
          <div className="md:col-span-2">
            <TextBody content={body} />
          </div>
          <aside className="flex flex-col gap-4 md:row-span-2 md:row-start-2 md:col-start-3">
            <Toc headers={toc} />
          </aside>
        </div>
      </Container>
    </div>
  );
}
