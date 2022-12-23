import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Card from "../../components/Card";
import { LayoutProps } from "../../components/Layout";
import getRoute from "../../lib/getRoute";
import {
  getNavigation,
  getAllRegionsQuery,
  RegionItemType,
} from "../../lib/sanity.api";
import { client } from "../../lib/sanity.client";

function AllRegionsPage({
  regions,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className="max-w-7xl mx-auto my-4 px-3 sm:px-4 lg:px-8">
        <div className="prose lg:prose-lg prose-h1:font-semibold prose-h1:leading-tight lg:prose-h1:leading-tight max-w-none my-8">
          <h1>Vofos {regions.length} fylkesutvalg</h1>
          <p className="lead max-w-prose">
            Studieforbundene har virksomhet i hele landet. Vofo samarbeider med
            fylkeskommunene og studieforbund i fylkene om en bærekraftig
            samfunnsutvikling.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 not-prose">
            {regions.map((region) => (
              <Card
                href={getRoute("region", region.slug)}
                key={region._id}
                title={region.name}
                image={region.image}
              >
                {region.description}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  regions: Array<RegionItemType>;
}> = async ({ preview = false }) => {
  const navigation = await getNavigation(preview);
  const layout: LayoutProps = { navigation };
  const regions = await client.fetch<Array<RegionItemType>>(getAllRegionsQuery);

  return { props: { preview, layout, regions }, revalidate: 10 };
};

export default AllRegionsPage;
