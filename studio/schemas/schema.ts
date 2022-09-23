// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import article from "./article";
import event from "./event";
import publication from "./publication";
import learningAssociation from "./learningAssociation";
import blockContent from "./blockContent";
import employee from "./employee";
import office from "./office";
import person from "./person";
import siteSettings from "./siteSettings";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    article,
    event,
    publication,
    blockContent,
    employee,
    learningAssociation,
    office,
    person,
    siteSettings,
  ]),
});
