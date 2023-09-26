import Button from "components/Button";
import Container from "components/Container";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Siden finnes ikke",
};

export default function NotFound() {
  return (
    <Container prose className="px-4">
      <h1>Siden finnes ikke</h1>
      <div className="max-w-prose">
        <p className="lead">
          Du har prøvd å komme inn på en side vi ikke kan finne. Vi kan ha
          flyttet eller fjernet innholdet, eller nettadressen kan være skrevet
          feil.
        </p>
        <p>
          Vi vet ikke hvor du skulle, men prøv gjerne å gå til forsiden for å
          finne innholdet derfra.
        </p>
        <div className="mb-4 not-prose">
          <Button as={Link} href="/">
            Gå til forsiden
          </Button>
        </div>
        <p>
          <Link href="/kontakt">Kontakt oss</Link> hvis du ikke finner det du
          leter etter.
        </p>
        <p className="text-gray-400">
          <small>Feilmelding: HTTP 404</small>
        </p>
      </div>
    </Container>
  );
}
