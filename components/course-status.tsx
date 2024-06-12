"use client";

import { ProgressCircle } from "@tremor/react";
import { useAtom } from "jotai";
import { CheckIcon } from "lucide-react";

import { completedCoursesAtom } from "./completed-courses-atom";

export function CourseStatus({
  slug,
  lessons,
}: {
  slug: string;
  lessons: string[];
}) {
  const [completed] = useAtom(completedCoursesAtom);

  const lessonsCompleted = (completed[slug] || []).filter((item) =>
    lessons.includes(item),
  );

  const isCompleted = lessonsCompleted.length === lessons.length;

  return (
    <div className="flex items-center gap-2 px-2">
      <ProgressCircle
        value={(lessonsCompleted.length / lessons.length) * 100}
        size="md"
        color={isCompleted ? "green" : undefined}
      >
        {isCompleted ? (
          <CheckIcon color="green" />
        ) : (
          <>
            {lessonsCompleted.length}/{lessons.length}
          </>
        )}
      </ProgressCircle>
    </div>
  );
}
