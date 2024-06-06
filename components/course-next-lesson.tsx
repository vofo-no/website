"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { CoursePayload } from "@/types";
import { useAtom } from "jotai";
import { ArrowRightIcon } from "lucide-react";

import { resolveHref } from "@/lib/resolveHref";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { completedCoursesAtom } from "./completed-courses-atom";

export function CourseNextLesson({ data }: { data: CoursePayload }) {
  const segment = useSelectedLayoutSegment();
  const [completed, setCompleted] = useAtom(completedCoursesAtom);

  const allLessons = data.lessons.map((item) => item.slug);
  const lessonsCompleted = (completed[data.slug] || []).filter((item) =>
    allLessons.includes(item),
  );
  const nextLessonIndex = (segment && allLessons.indexOf(segment) + 1) || 0;
  const nextLesson = data.lessons[nextLessonIndex];

  function completeSession() {
    if (segment) {
      setCompleted((prevState) => ({
        ...prevState,
        [data.slug]: Array.from(new Set([...lessonsCompleted, segment])),
      }));
    }
  }

  return (
    <div className="container my-8 text-center">
      <Card className="max-w-prose mx-auto">
        {nextLesson ? (
          <>
            <CardHeader>
              <CardDescription>
                {nextLessonIndex === 0 ? "Start kurset" : "Fortsett kurset"}
              </CardDescription>
              <CardTitle>
                {nextLessonIndex + 1}: {nextLesson.title}
              </CardTitle>
            </CardHeader>
            <CardContent>{nextLesson.description}</CardContent>
            <CardFooter>
              <Button asChild size="lg" className="w-full">
                <Link
                  onClick={completeSession}
                  href={[
                    resolveHref("course", data.slug),
                    nextLesson.slug,
                  ].join("/")}
                >
                  Start leksjon {nextLessonIndex + 1}
                  <ArrowRightIcon className="ml-1" />
                </Link>
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Gratulerer! 🎉</CardTitle>
              <CardDescription>
                Dette var den siste leksjonen i kurset.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild size="lg" className="w-full">
                <Link onClick={completeSession} href="/opplaring">
                  Fullfør kurset
                </Link>
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
