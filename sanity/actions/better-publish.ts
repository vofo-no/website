import { SanityDocument } from "next-sanity";
import {
  DocumentActionComponent,
  DocumentActionProps,
  Slug,
  useDocumentOperation,
} from "sanity";
import speakingurl from "speakingurl";

export function createBetterPublishAction(
  originalPublishAction: DocumentActionComponent,
) {
  const BetterPublishAction = (props: DocumentActionProps) => {
    const { patch } = useDocumentOperation(props.id, props.type);

    const patchSlug = (slugValue: string) => {
      patch.execute([{ set: { slug: { current: slugValue, _type: "slug" } } }]);
    };

    const patchPublishedAt = () => {
      patch.execute([{ set: { publishedAt: new Date().toISOString() } }]);
    };

    const patchExpriedAt = (publishedAt: string) => {
      const publishedDate = new Date(publishedAt);
      patch.execute([
        {
          set: {
            expiration: {
              expiredAt: new Date(
                publishedDate.getFullYear() + 1,
                publishedDate.getMonth(),
                publishedDate.getDate(),
              ).toISOString(),
            },
          },
        },
      ]);
    };

    const originalResult = originalPublishAction(props)!;

    return {
      ...originalResult,
      onHandle: async () => {
        if (!props.draft || props.type !== "post") {
          return originalResult.onHandle!();
        }

        if (
          typeof props.draft.title === "string" &&
          !(props.published?.slug as Slug | undefined)?.current
        ) {
          const generatedSlug = props.draft.title
            ? speakingurl(props.draft.title, { lang: "da", symbols: true })
            : null;

          if (generatedSlug) {
            patchSlug(generatedSlug);
          }
        }

        if (!props.draft.publishedAt) {
          patchPublishedAt();
        }

        if (!(props.draft.expiration as any)?.expiredAt) {
          patchExpriedAt(String(props.draft.publishedAt));
        }

        originalResult.onHandle!();
      },
    };
  };
  return BetterPublishAction;
}
