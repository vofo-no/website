import { Provider } from "jotai";

export default async function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}
