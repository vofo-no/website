import { Metadata } from "next";
import Link from "next/link";
import { loadAllCourses } from "@/sanity/loader/loadQuery";
import { ArrowRight } from "lucide-react";

import { resolveHref } from "@/lib/resolveHref";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CourseStatus } from "@/components/course-status";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export const metadata: Metadata = {
  title: "Opplæring",
  description:
    "Elektroniske kurs for alle medarbeidere, tillitsvalgte og andre som vil lære mer om frivillig voksenopplæring.",
};

export default async function Page() {
  const data = await loadAllCourses();

  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Opplæring</PageHeaderHeading>
        <PageHeaderDescription>
          Elektroniske kurs for alle medarbeidere, tillitsvalgte og andre som
          vil lære mer om frivillig voksenopplæring 🎓
        </PageHeaderDescription>
      </PageHeader>

      <div className="flex flex-col gap-8 mb-8 mx-auto max-w-prose">
        {data.map((item) => (
          <Card key={item._id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-center">
                <CourseStatus slug={item.slug} lessons={item.lessons} />
                <p>{item.description}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="mx-auto">
                <Link href={resolveHref("course", item.slug)!}>
                  Gå til kurset <ArrowRight />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
