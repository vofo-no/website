const knownRoutes: Record<string, string> = {
  event: "aktuelt/arrangement",
  publication: "aktuelt/dokument",
  article: "aktuelt/artikkel",
};

export default function getRoute(typeName: string, slug?: string) {
  const baseRoute = knownRoutes[typeName];

  if (!baseRoute)
    throw new Error(
      `No known route for type ${typeName}. Please update lib/getRoute.ts.`
    );

  return [baseRoute, slug].join("/");
}
