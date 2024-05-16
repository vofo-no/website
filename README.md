<p align="center">
  <a href="https://www.vofo.no">
    <img src="https://www.vofo.no/favicon.ico" alt="Vofo logo" />
    <h3 align="center">Voksenopplæringsforbundet</h3>
  </a>
</p>

<p align="center">
  Studieforbundenes interesseorganisasjon
</p>

## Nettsidene til Vofo
Vi bruker nettsidene til å presentere oss selv og hva vi jobber med, til å dele viktig informasjon om frivillig voksenopplæring i studieforbund og til å formidle tjenester og relevant kunnskap til målgruppene våre.

Dette er et [Next.js](https://nextjs.org/)-prosjekt som hostes hos [Vercel](https://vercel.com/?utm_source=vofo-kursinfo&utm_campaign=oss). Vi bruker følgende tjenester:

* [Sanity.io](https://sanity.io/) til strukturerte data
* [Algolia](https://algolia.com/) til søk
* [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) til statistikkdata

## Hvordan du kan bidra
Du kan bidra med å [melde inn feil og mangler](https://github.com/vofo-no/website/issues), delta i diskusjonen eller foreslå endringer og nye funksjoner. Du trenger ikke være utvikler for å bidra!

### Lokal utvikling
Hvis du _er_ utvikler og vil bidra, kan du klone dette prosjektet og kjøre det lokalt på maskinen din. Vi bruker ```npm``` til å installere avhengigheter og kjøre skript.

Før du starter, må du ha en oppdatert (nyeste LTS) versjon av Node.js installert. Du må også ha kontoer hos tjenestene som er listet over for å bygge eller kjøre de delene av systemet som krever dette.

```bash
git clone https://github.com/vofo-no/website
cd website
npm install
npm build
npm lint
npm test
```

Du trenger følgende systemvariabler, som kan lagres i en fil kalt ```.env.local```:
```dotenv
# Variabler fra Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_READ_TOKEN

# Vercel Blob
BLOB_READ_WRITE_TOKEN

# Variabler fra Algolia
NEXT_PUBLIC_ALGOLIA_APP_ID
NEXT_PUBLIC_ALGOLIA_INDEX
NEXT_PUBLIC_ALGOLIA_SEARCH_TOKEN
ALGOLIA_WRITE_TOKEN
```

Når prosjeket kan bygges og består alle testene på maskinen din, kan du kjøre utviklingsserveren:

```bash
npm run dev
```

Gå til [http://localhost:3000](http://localhost:3000) i nettleseren din for å se resultatet.

Når du har gjort endringer som du vil bidra med, kan du åpne en [pull request](https://github.com/vofo-no/website/pulls).


****

[![Powered by Vercel][vercel]][vercel-url]

[vercel]: ./components/powered-by-vercel.svg
[vercel-url]: https://vercel.com/?utm_source=vofo-kursinfo&utm_campaign=oss
