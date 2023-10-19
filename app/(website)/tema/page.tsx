import Card from "components/Card";
import Container from "components/Container";
import { getAllTopics } from "lib/sanity.fetch";
import { resolveHref } from "lib/sanity.links";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tema",
};

export default async function ProjectsPage() {
  const topics = await getAllTopics();

  return (
    <Container prose>
      <h1>Tema</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
        {topics.map((topic) => (
          <Card
            href={resolveHref("topic", topic.slug)!}
            key={topic._id}
            title={topic.title}
            image={topic.image}
          >
            <div className="text-gray-600 text-sm leading-normal line-clamp-3">
              {topic.description}
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
