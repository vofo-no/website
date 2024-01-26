import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { CountyListItemPayload } from "@/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

function CountyListItem(props: { data: CountyListItemPayload }) {
  const { image, title, slug, description } = props.data ?? {};

  return (
    <Link
      href={`/fylker/${slug}`}
      className="group flex flex-row md:odd:flex-row-reverse gap-4 items-center mr-auto md:odd:mr-0 md:odd:ml-auto"
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
        <h2 className="text-xl font-bold mb-2 group-hover:text-primary group-hover:underline">
          {title}
        </h2>
        <p className="text-muted-foreground line-clamp-3">{description}</p>
      </div>
    </Link>
  );
}

export function CountiesIndexPageLayout(props: {
  data: CountyListItemPayload[];
}) {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Voksne lærer i hele landet</PageHeaderHeading>
        <PageHeaderDescription>
          Fylkesutvalgene våre jobber for samarbeid og bedre rammevilkår for
          studieforbund på regionalt og lokalt nivå.
        </PageHeaderDescription>
      </PageHeader>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {props.data?.map((item) => (
          <CountyListItem key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
}
