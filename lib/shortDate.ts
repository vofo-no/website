import { RawTime } from "types/time";

import formatTime from "./formatTime";

export default function shortDate(time: RawTime) {
  return formatTime(time, "P");
}
