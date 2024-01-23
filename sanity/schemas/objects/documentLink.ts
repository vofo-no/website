import { ArrowRightIcon } from "@sanity/icons";
import { defineType } from "sanity";

export default defineType({
  name: "documentLink",
  title: "Lenke til dokument",
  icon: ArrowRightIcon,
  type: "reference",
  to: [{ type: "post" }, { type: "page" }],
  validation: (rule) => rule.required(),
  options: { disableNew: true },
});
