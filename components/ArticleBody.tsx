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
  const hasMedia = !!media;

  return (
    <div className="grid md:grid-cols-3 gap-x-8">
      {media ? (
        <>
          <div className="md:col-span-2 md:row-span-2">{media}</div>
          <div className="border-gray-200 border-y md:border-y-0 mb-4">
            {meta}
          </div>
        </>
      ) : null}
      <Toc headers={toc} mobile />
      <div
        className={classNames(
          "md:col-span-2",
          hasMedia ? "md:row-start-3" : "md:row-start-1"
        )}
      >
        <TextBody content={body} />
      </div>
      <aside
        className={classNames(
          "md:col-start-3",
          hasMedia && "md:row-start-2 md:row-span-2"
        )}
      >
        <div className="flex flex-col gap-4 md:sticky md:top-4">
          <Toc headers={toc} />
          <div>[ASIDE]</div>
        </div>
      </aside>
    </div>
  );
}
