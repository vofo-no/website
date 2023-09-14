import { toPlainText } from "@portabletext/react";
import slugify from "lib/slugify";

export default function Toc({ headers = [] }: { headers?: any[] }) {
  if (headers.length < 3) return null;

  return (
    <div className="md:sticky md:top-4">
      <div>
        <h2 className="!mt-0">Innhold</h2>
        <ul className="list-none p-0">
          {headers.map((item) => {
            const plain = toPlainText(item);
            const anchor = slugify(plain);
            return (
              <li key={item._key}>
                <a href={`#${anchor}`}>{plain}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
