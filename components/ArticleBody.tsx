import classNames from "classnames";
import { PortableTextBlock } from "sanity";

import TextBody from "./TextBody";
import Toc from "./Toc";

interface Props {
  body?: PortableTextBlock[];
  toc?: PortableTextBlock[];
  media?: any; // TODO
  meta?: any; // TODO
}

export default function ArticleBody({ body, toc, media, meta }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-x-4">
      {media ? (
        <>
          <div className="md:col-span-2 md:row-span-2">{media}</div>
          <div className="border-gray-200 border-y md:border-y-0 mb-4">
            {meta}
          </div>
        </>
      ) : null}
      <div className="md:col-span-2">
        <TextBody content={body} />
      </div>
      <aside
        className={classNames(
          "flex flex-col gap-4 md:row-span-2 md:col-start-3",
          media && "md:row-start-2"
        )}
      >
        <Toc headers={toc} />
      </aside>
    </div>
  );
}
