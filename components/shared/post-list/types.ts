export interface PostListProps {
  referencesId?: string;
  searchParams?: {
    docTypes: string[] | null;
    q: string | null;
    refs: string[] | null;
    years: string[] | null;
  };
  title?: string;
  archiveParams?: URLSearchParams;
  dynamic?: boolean;
}
