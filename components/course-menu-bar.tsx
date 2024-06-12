"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { CoursePayload } from "@/types";
import { ProgressCircle } from "@tremor/react";
import { useAtom } from "jotai";
import {
  BookIcon,
  CheckIcon,
  HeartHandshakeIcon,
  ListIcon,
} from "lucide-react";

import { formatNumber } from "@/lib/formatNumber";
import { resolveHref } from "@/lib/resolveHref";
import { Badge } from "@/components/ui/badge";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { completedCoursesAtom } from "./completed-courses-atom";

export function CourseMenuBar({ data }: { data: CoursePayload }) {
  const segment = useSelectedLayoutSegment();
  const [completed] = useAtom(completedCoursesAtom);

  const allLessons = data.lessons.map((item) => item.slug);
  const lessonsCompleted = (completed[data.slug] || []).filter((item) =>
    allLessons.includes(item),
  );
  const currentLessonIndex = data.lessons.findIndex(
    (item) => item.slug === segment,
  );
  const currentLesson = data.lessons[currentLessonIndex];

  return (
    <div className="container sticky top-14 md:top-24 pt-2">
      <Menubar className="h-16 shadow">
        <MenubarMenu>
          <MenubarTrigger className="h-12 rounded-full hover:bg-muted">
            <ListIcon size={24} />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem asChild>
              <Link
                href={resolveHref("course", data.slug)!}
                className="flex gap-2"
              >
                <Badge
                  variant={segment === null ? "default" : "outline"}
                  className="text-base h-10 w-10 justify-center"
                >
                  <HeartHandshakeIcon size={18} />
                </Badge>
                Introduksjon
              </Link>
            </MenubarItem>
            <MenubarSeparator />
            {data.lessons.map((item, index) => (
              <MenubarItem key={item.slug} asChild>
                <Link
                  href={[resolveHref("course", data.slug), item.slug].join("/")}
                  className="flex gap-2"
                >
                  <Badge
                    variant={segment === item.slug ? "default" : "outline"}
                    className="text-base h-10 w-10 justify-center"
                  >
                    {lessonsCompleted.includes(item.slug) ? (
                      <CheckIcon size={18} />
                    ) : (
                      index + 1
                    )}
                  </Badge>
                  {item.title}
                </Link>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
        <div className="p-2 flex items-center gap-3 grow truncate">
          <BookIcon />
          <div className="flex flex-col leading-6">
            {currentLesson ? (
              <>
                <span className="font-semibold truncate">
                  Leksjon {currentLessonIndex + 1}
                </span>
                <span className="text-muted-foreground truncate">
                  {currentLesson.title}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground truncate">
                Introduksjon
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 px-2">
          <div className="flex flex-col text-right text-sm leading-5">
            <strong className="font-semibold">
              {formatNumber(lessonsCompleted.length / allLessons.length, {
                style: "percent",
              })}
            </strong>
            <span className="text-muted-foreground">
              {lessonsCompleted.length}/{allLessons.length} fullført
            </span>
          </div>
          <ProgressCircle
            value={(lessonsCompleted.length / allLessons.length) * 100}
            size="sm"
          />
        </div>
      </Menubar>
    </div>
  );
}
