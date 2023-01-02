import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import CalendarList from "../../components/CalendarList";
import ContactPerson from "../../components/ContactPerson";
import Hero from "../../components/Hero";
import { LayoutProps } from "../../components/Layout";
import NewsList from "../../components/NewsList";
import {
  getNavigation,
  RegionItemType,
  getAllRegionsSlugsQuery,
  getRegionQuery,
} from "../../lib/sanity.api";
import { client } from "../../lib/sanity.client";

function AllRegionsPage({
  region,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!region) return null;

  return (
    <>
      <Hero image={region.image} title={region.name} />

      <div className="max-w-7xl mx-auto my-4 px-3 sm:px-4 lg:px-8">
        <div className="prose lg:prose-lg prose-h1:font-semibold prose-h1:leading-tight lg:prose-h1:leading-tight max-w-none my-8">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="grow">
              <h1>{region.name}</h1>
              <p className="lead max-w-prose">{region.description}</p>
            </div>
            <div>
              {region.contacts?.length
                ? region.contacts.map((contact) => (
                    <ContactPerson
                      key={contact._id}
                      {...contact.person}
                      title={contact.job}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200 mb-4 grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <h2 className="text-xl font-semibold my-4">Aktuelt</h2>
            <NewsList items={region.news || []} />
          </div>
          <div>
            <h2 className="text-xl font-semibold my-4">Kalender</h2>
            <CalendarList items={region.calendar || []} />
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<
  {
    region: RegionItemType;
  },
  {
    slug: string;
  }
> = async ({ params, preview = false }) => {
  if (!params || !params.slug) return { notFound: true };

  const navigation = await getNavigation(preview);
  const layout: LayoutProps = { navigation };
  const region = await client.fetch<RegionItemType>(getRegionQuery, {
    slug: params.slug,
  });

  return { props: { preview, layout, region }, revalidate: 10 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch<Array<{ slug: string }>>(
    getAllRegionsSlugsQuery
  );

  return {
    paths: slugs.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
};

export default AllRegionsPage;
