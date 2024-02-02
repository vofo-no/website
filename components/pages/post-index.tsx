import { Suspense, useMemo } from "react";

import { postTypes } from "@/lib/postTypes";
import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { PostSearch } from "@/components/post-search";

const FIRST_YEAR = 2022;

function yearRange() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - FIRST_YEAR + 1 }, (_, i) =>
    String(currentYear - i),
  );
}

interface PostIndexPageProps {
  counties: { title: string; value: string }[];
  topics: { title: string; value: string }[];
  children: React.ReactNode;
}

export function PostsIndexPageLayout(props: PostIndexPageProps) {
  const years = useMemo(() => yearRange(), []);

  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Dokument- og nyhetsarkiv</PageHeaderHeading>
        <PageActions>
          <Suspense>
            <PostSearch
              years={years}
              topics={props.topics}
              counties={props.counties}
              types={postTypes}
            />
          </Suspense>
        </PageActions>
      </PageHeader>

      {props.children}
    </div>
  );
}
