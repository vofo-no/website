import { Metadata } from "next";
import Link from "next/link";
import { loadCalendarEntries, loadHome } from "@/sanity/loader/loadQuery";

import { CalendarEntry } from "@/components/calendar-entry";
import { PostList } from "@/components/shared/post-list";

import { HomePageLayout } from "../../components/pages/home-page";

export async function generateMetadata(): Promise<Metadata> {
  const data = await loadHome();

  return {
    description: data.description,
  };
}

export default async function HomePage() {
  const [data, calendarEntries] = await Promise.all([
    loadHome(),
    loadCalendarEntries().then((result) => result.slice(0, 6)),
  ]);

  const archiveParams = new URLSearchParams({});

  return (
    <HomePageLayout data={data}>
      <PostList archiveParams={archiveParams} />
      {calendarEntries.length && (
        <section className="my-12">
          <h1 className=" text-3xl font-semibold leading-normal mb-6">
            <Link
              href="/kalender"
              className="hover:underline hover:text-primary"
            >
              Kalender
            </Link>
          </h1>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-12">
            {calendarEntries.map((item) => (
              <CalendarEntry key={item._id} data={item} />
            ))}
          </div>
        </section>
      )}
    </HomePageLayout>
  );
}
