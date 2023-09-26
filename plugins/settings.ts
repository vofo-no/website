/**
 * This plugin contains all the logic for setting up the singletons
 */

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

export const singletonPlugin = (types: string[]) =>
  definePlugin({
    name: "singletonPlugin",
    document: {
      // Hide 'Singletons (such as Home)' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
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
  });

// The StructureResolver is how we're changing the DeskTool structure to linking to document (named Singleton)
// like how "Home" is handled.
export const pageStructure = (
  typeDefArray: DocumentDefinition[]
): StructureResolver => {
  return (S) => {
    // Goes through all of the singletons that were provided and translates them into something the
    // Desktool can understand
    const singletonItems = typeDefArray.map((typeDef) => {
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
          !typeDefArray.find((singleton) => singleton.name === listItem.getId())
      )
      .map((itemBuilder) =>
        itemBuilder.title(getPluralTitle(itemBuilder.getTitle()!))
      );

    return S.list()
      .title("Innhold")
      .items([...singletonItems, S.divider(), ...defaultListItems]);
  };
};
