import { Suspense, useMemo } from "react";
import { PostListItemPayload } from "@/types";

import { postTypes } from "@/lib/postTypes";
import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { PostListItem } from "@/components/post-list-item";
import { PostSearch } from "@/components/post-search";

const FIRST_YEAR = 2022;

function yearRange() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - FIRST_YEAR + 1 }, (_, i) =>
    String(currentYear - i),
  );
}

interface PostIndexPageProps {
  data: PostListItemPayload[];
  counties: { title: string; value: string }[];
  topics: { title: string; value: string }[];
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 mb-8">
        {props.data?.map((item) => <PostListItem key={item._id} item={item} />)}
      </div>
    </div>
  );
}
