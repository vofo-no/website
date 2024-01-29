import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { TopicListItemPayload } from "@/types";
import Balancer from "react-wrap-balancer";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

function TopicListItem(props: { data: TopicListItemPayload }) {
  const { image, title, slug, description } = props.data ?? {};

  return (
    <Link
      href={`/tema/${slug}`}
      className="group flex flex-row md:odd:flex-row-reverse gap-4 items-center mr-auto md:odd:mr-0 md:odd:ml-auto md:odd:text-right"
    >
      <Avatar className="h-20 w-20 border border-border shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
        {image && (
          <AvatarImage
            src={urlForImage(image).size(160, 160).fit("fill").url()}
          />
        )}
        <AvatarFallback className="text-3xl">
          {title.substring(0, 1)}
        </AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-xl font-bold group-hover:text-primary group-hover:underline">
          {title}
        </h2>
        {description && (
          <Balancer as="p" className="text-muted-foreground">
            {description}
          </Balancer>
        )}
      </div>
    </Link>
  );
}

export function TopicsIndexPageLayout(props: { data: TopicListItemPayload[] }) {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Tema</PageHeaderHeading>
        <PageHeaderDescription>
          Vofo jobber med mange ulike tema! 🚀
        </PageHeaderDescription>
      </PageHeader>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {props.data?.map((item) => (
          <TopicListItem key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
}
