import S from "@sanity/desk-tool/structure-builder";
import { MdMenu, MdSettings, MdWeb } from "react-icons/md";

export default () =>
  S.list()
    .title("Innhold")
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) => !["siteSettings", "navigation"].includes(listItem.getId())
      ),
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
            ])
        ),
    ]);
