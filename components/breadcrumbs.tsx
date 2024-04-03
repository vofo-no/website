"use client";

import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const vofoRegex = /\b(vofo)\b/g;

function displayPathName(raw: string) {
  const str = raw.charAt(0).toUpperCase() + raw.slice(1);
  return str.replace("-", " ").replace(vofoRegex, "Vofo");
}

export function Breadcrumbs() {
  const segments = useSelectedLayoutSegments().slice(0, -1);

  if (!segments.length) return null;

  return (
    <Breadcrumb className="container mt-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Hjem</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((link, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={href}>{displayPathName(link)}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
        <BreadcrumbSeparator />
      </BreadcrumbList>
    </Breadcrumb>
  );
}
