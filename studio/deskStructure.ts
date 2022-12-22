import { MdMenu, MdSettings, MdWeb } from "react-icons/md";

const settingIds = ["siteSettings", "navigation", "employee", "person"];
const staticIds = ["topic", "region", "learningAssociation"];

export default (S) =>
  S.list()
    .title("Innhold")
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) => ![...settingIds, ...staticIds].includes(listItem.getId())
      ),
      S.divider(),
      ...S.documentTypeListItems().filter((listItem) =>
        staticIds.includes(listItem.getId())
      ),
      S.divider(),
      S.listItem()
        .title("Innstillinger")
        .icon(MdSettings)
        .child(
          S.list()
            .title("Instillinger")
            .items([
              S.listItem()
                .title("Metadata")
                .icon(MdWeb)
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId("siteSettings")
                ),
              S.listItem()
                .title("Navigasjon")
                .icon(MdMenu)
                .child(
                  S.document().schemaType("navigation").documentId("navigation")
                ),
              S.documentTypeListItem("employee").title("Ansatte"),
              S.documentTypeListItem("person").title("Personer"),
            ])
        ),
    ]);
