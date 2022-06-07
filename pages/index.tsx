import { ChevronRightIcon } from "@heroicons/react/outline";
import type { InferGetStaticPropsType, NextPage } from "next";
import Hero from "../components/Hero";
import { LayoutProps } from "../components/Layout";
import { NewsItemProps } from "../components/NewsItem";
import NewsList from "../components/NewsList";

function FrontPage({ news }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto my-4 px-2 sm:px-4 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center border-b border-gray-200 pb-4 mb-4">
          <p className="col-span-2 lg:col-span-3 text-base text-gray-500">
            Voksenopplæringsforbundet (Vofo) er studieforbundenes
            interesseorganisasjon. Vårt hovedmål er å styrke studieforbundenes
            rammevilkår i arbeidet med å gi voksne læringsmuligheter.
          </p>
          <div className="lg:col-span-2 flex flex-col items-center justify-center tracking-tight">
            <span className="text-7xl font-bold text-crimson-500 mr-1.5 proportional-nums">
              14
            </span>
            <span className="text-xl">studieforbund</span>
          </div>
          <div className="lg:col-span-2 flex flex-col items-center justify-center tracking-tight">
            <span className="text-7xl font-bold text-crimson-500 proportional-nums">
              11
            </span>
            <span className="text-xl">fylkesutvalg</span>
          </div>
        </div>
        <div className="border-b border-gray-200 mb-4">
          <h2 className="sr-only">Aktuelt</h2>
          <NewsList items={news} />
          <p className="text-right text-xl my-6">
            <a
              href="#"
              className="text-blue-700 hover:text-crimson-500 hover:underline"
            >
              Se alle saker
              <ChevronRightIcon className="w-5 h-5 inline-block ml-1" />
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export function getStaticProps() {
  const layout: LayoutProps = {
    navigation: {
      categories: [
        {
          name: "Studieforbund",
          sections: [
            {
              name: "Generelt",
              items: [
                { name: "Om studieforbund", href: "#" },
                { name: "Statistikk", href: "#" },
                { name: "Forskning", href: "#" },
              ],
            },
            {
              name: "Regelverk",
              items: [
                { name: "Voksenopplæringsloven", href: "#" },
                { name: "Gratis lokaler", href: "#" },
                { name: "Tilskudd", href: "#" },
              ],
            },
            {
              name: "Godkjente studieforbund",
              items: [
                { name: "Akademisk studieforbund", href: "#" },
                { name: "Idrettens studieforbund", href: "#" },
                { name: "Kristelig studieforbund", href: "#" },
                { name: "Musikkens studieforbund", href: "#" },
                { name: "Samisk studieforbund", href: "#" },
                { name: "Senterpartiets studieforbund", href: "#" },
                { name: "Studieforbundet AOF", href: "#" },
                { name: "Studieforbundet Funkis", href: "#" },
                { name: "Studieforbundet kultur og tradisjon", href: "#" },
                { name: "Studieforbundet livslang læring", href: "#" },
                { name: "Studieforbundet natur og miljø", href: "#" },
                { name: "Studieforbundet næring og samfunn", href: "#" },
                { name: "Studieforbundet Solidaritet", href: "#" },
                { name: "Venstres studieforbund", href: "#" },
              ],
            },
          ],
        },
        {
          name: "Politikk",
          sections: [
            {
              name: "Politiske saker",
              items: [
                { name: "Demokrati og deltakelse", href: "#" },
                { name: "Kunnskap og kompetanse for alle", href: "#" },
                { name: "Statsbudsjettet", href: "#" },
                { name: "Alle politiske saker", href: "#" },
              ],
            },
            {
              name: "Planer og organisering",
              items: [
                { name: "Strategiplan", href: "#" },
                { name: "Styret", href: "#" },
                { name: "Uttalelser og innspill", href: "#" },
                { name: "Samarbeid og prosjekter", href: "#" },
              ],
            },
            {
              name: "Fylkesutvalg",
              items: [
                { name: "Troms og Finnmark", href: "#" },
                { name: "Nordland", href: "#" },
                { name: "Trøndelag", href: "#" },
                { name: "Møre og Romsdal", href: "#" },
                { name: "Vestland", href: "#" },
                { name: "Rogaland", href: "#" },
                { name: "Agder", href: "#" },
                { name: "Vestfold og Telemark", href: "#" },
                { name: "Innlandet", href: "#" },
                { name: "Oslo", href: "#" },
                { name: "Viken", href: "#" },
              ],
            },
          ],
        },
      ],
      pages: [
        { name: "Om Vofo", href: "#" },
        { name: "Ressurser", href: "#" },
      ],
    },
  };

  const news: Array<NewsItemProps> = [
    {
      category: "oppslag",
      date: "2022-04-17T12:00:00+02",
      title: "90 år for voksnes læringsmuligheter",
      featured: true,
      description:
        "17. april 1932 ble Voksenopplæringsforbundet stiftet under navnet Samnemnda for studiearbeid. I 90 år har Voksenopplæringsforbundet jobbet for styrke frivillig -og ideell sektors rammevilkår i arbeidet med å gi voksne læringsmuligheter.",
    },
    {
      category: "arrangement",
      date: "2022-05-05T12:00:00+02",
      title: "Vofo 90-årsjubileum",
      featured: true,
      description:
        "Vofo blir 90 år, og det skal feires! I 90 år har Vofo vært opptatt av at livslang læring er en mulighet for alle. Vi håper du har lyst til å feire med oss!",
    },
    {
      category: "oppslag",
      date: "2022-03-12T12:00:00+01",
      title: "Fylkesutvalget i Vestfold og Telemark er konstituert",
      featured: false,
      description:
        "Vofos fylkesutvalg i Vestfold og Telemark skal være en ressurs som fylkeskommunen lytter til. Vi skal fremstå som en seriøs og pålitelig aktør i arbeidet med å fremme livsmestring og livsglede for våre medmennesker, sier nyvalgt leder Åke Kokvik.",
    },
    {
      category: "arrangement",
      date: "2022-03-11T12:02:00+01",
      title: "Møte i fylkesutvalget i Møre og Romsdal",
      featured: false,
      description: "Innkalling til møte i fylkesutvalget.",
    },
    {
      category: "arrangement",
      date: "2022-03-10T12:10:00+01",
      title: "Vofos årsmøte 2022",
      featured: false,
      description: "Det kalles herved inn til årsmøte 2022.",
    },
    {
      category: "oppslag",
      date: "2022-04-01T12:00:00+01",
      title: "Studieforbundenes kursvirksomhet i 2021",
      featured: true,
      description:
        "Statistikken for studieforbundenes kursvirksomhet i 2021 er nå publisert av Statistisk sentralbyrå. Koronarestriksjonene har, som i 2020, satt sitt preg på kursvirksomheten i 2021. Det er en nedgang i både antall kurs og i omfanget av kurstimer.",
    },
  ];

  return { props: { layout, news } };
}

export default FrontPage;
