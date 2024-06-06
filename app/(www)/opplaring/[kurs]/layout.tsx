import { loadCourse } from "@/sanity/loader/loadQuery";

import { CourseMenuBar } from "@/components/course-menu-bar";
import { CourseNextLesson } from "@/components/course-next-lesson";

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { kurs: string };
}) {
  const data = await loadCourse(params.kurs);

  return (
    <>
      {data && <CourseMenuBar data={data} />}
      {children}
      {data && <CourseNextLesson data={data} />}
    </>
  );
}
