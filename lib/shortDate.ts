import formatTime, { RawTime } from "./formatTime";

export default function shortDate(time: RawTime) {
  return formatTime(time, "P");
}
