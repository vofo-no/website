import ArticleBody from "components/ArticleBody";
import Container from "components/Container";
import { getPrivacy } from "lib/sanity.fetch";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return defineMetadata({
    title: "Personvernerklæring",
  });
}

export default async function Page() {
  const data = await getPrivacy();

  return (
    <Container paper prose>
      <h1>Personvernerklæring</h1>
      <p className="lead max-w-prose">
        Personopplysninger er opplysninger som kan kobles til deg som person. I
        denne personvernerklæringen kan du lese om hvilke personopplysninger
        Vofo er behandlingsansvarlig for. Det er viktig for oss at du vet hva
        slags personopplysninger vi behandler, slik at du kan ivareta dine
        rettigheter etter personvernlovgivningen.
      </p>
      <ArticleBody body={data.privacy} toc={data.toc} />
    </Container>
  );
}
