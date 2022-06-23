import { MdEvent } from "react-icons/md";
import eventTimeDisplay from "../lib/eventTimeDisplay";
import { NewsItemType } from "../lib/sanity.api";

export default function NewsItemMeta(props: NewsItemType) {
  switch (props._type) {
    case "event": {
      return (
        <div className="text-gray-700 rounded my-2 text-sm flex gap-2 items-center">
          <div>
            <div className="text-crimson-600">
              <MdEvent size={28} />
            </div>
          </div>
          <div className="flex flex-col">
            <span>{eventTimeDisplay(props.start, props.end)}</span>
            <span>{props.location?.name}</span>
          </div>
        </div>
      );
    }
    default:
      return null;
  }
}
