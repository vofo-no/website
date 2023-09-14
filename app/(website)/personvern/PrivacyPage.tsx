import Container from "components/Container";
import TextBody from "components/TextBody";
import type { PrivacyPayload } from "types";

export interface PrivacyPageProps {
  data: PrivacyPayload | null;
}

export default function PrivacyPage({ data }: PrivacyPageProps) {
  const { privacy } = data ?? {};

  return (
    <div>
      <Container paper prose>
        <h1>Voksenopplæringsforbundets personvernerklæring</h1>
        <p className="lead max-w-prose">
          Personopplysninger er opplysninger som kan kobles til deg som person.
          I denne personvernerklæringen kan du lese om hvilke personopplysninger
          Vofo er behandlingsansvarlig for. Det er viktig for oss at du vet hva
          slags personopplysninger vi behandler, slik at du kan ivareta dine
          rettigheter etter personvernlovgivningen.
        </p>
        <TextBody content={privacy} />
      </Container>
    </div>
  );
}
