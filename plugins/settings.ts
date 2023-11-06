import { definePlugin, type DocumentDefinition } from "sanity";
import { type StructureResolver } from "sanity/desk";

const pluralTitleExceptions: Record<string, string> = {
  Artikkel: "Artikler",
};

function getPluralTitle(singularTitle: string) {
  return (
    pluralTitleExceptions[singularTitle] ||
    [singularTitle, singularTitle.endsWith("e") ? "r" : "er"].join("")
  );
}

type SingletonPluginOptions = {
  types: string[];
};

/**
 * This plugin contains all the logic for setting up the singletons
 */
export const singletonPlugin = definePlugin<SingletonPluginOptions>(
  ({ types }) => ({
    name: "singletonPlugin",
    document: {
      // Hide 'Singletons (such as Home)' from new document options
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === "global") {
          return prev.filter(
            (templateItem) => !types.includes(templateItem.templateId)
          );
        }

        return prev;
      },
      // Removes the "duplicate" action on the Singletons (such as Home)
      actions: (prev, { schemaType }) => {
        if (types.includes(schemaType)) {
          return prev.filter(({ action }) => action !== "duplicate");
        }

        return prev;
      },
    },
  })
);

type pageStructureOptions = {
  singletonTypeDefs: DocumentDefinition[];
  hiddenTypes?: string[];
};

// The StructureResolver is how we're changing the DeskTool structure to linking to document (named Singleton)
// like how "Home" is handled.
export const pageStructure = ({
  singletonTypeDefs,
  hiddenTypes,
}: pageStructureOptions): StructureResolver => {
  return (S) => {
    // Goes through all of the singletons that were provided and translates them into something the
    // Desktool can understand
    const singletonItems = singletonTypeDefs.map((typeDef) => {
      return S.listItem()
        .title(typeDef.title!)
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name)
            .views([
              // Default form view
              S.view.form(),
            ])
        );
    });

    // The default root list items (except custom ones)
    const defaultListItems = S.documentTypeListItems()
      .filter(
        (listItem) =>
          !singletonTypeDefs.find(
            (singleton) => singleton.name === listItem.getId()
          )
      )
      .filter((listItem) => !hiddenTypes?.includes(listItem.getId() || ""))
      .map((itemBuilder) =>
        itemBuilder.title(getPluralTitle(itemBuilder.getTitle()!))
      );

    return S.list()
      .title("Innhold")
      .items([...singletonItems, S.divider(), ...defaultListItems]);
  };
};
