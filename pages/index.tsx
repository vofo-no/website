import { ChevronRightIcon } from "@heroicons/react/outline";
import type { InferGetStaticPropsType } from "next";
import Hero from "../components/Hero";
import { LayoutProps } from "../components/Layout";
import NewsList from "../components/NewsList";

import { getNavigation, getNewsListItems } from "../lib/sanity.api";

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

export async function getStaticProps({ preview = false }) {
  const navigation = await getNavigation(preview);
  const layout: LayoutProps = { navigation };
  const news = await getNewsListItems(preview);

  return { props: { preview, layout, news } };
}

export default FrontPage;
