import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Card from "components/Card";
import Container from "components/Container";
import formatTime from "lib/formatTime";
import { getAllProjects } from "lib/sanity.fetch";
import { resolveHref } from "lib/sanity.links";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prosjekter",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const activeProjects = projects?.filter((project) => project.active) || [];
  const pastProjects = projects?.slice(activeProjects.length) || [];

  return (
    <Container prose>
      <h1>Prosjekter</h1>
      <p className="lead">
        Vofo deltar i og er partner i flere ulike prosjekter.
      </p>
      {activeProjects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
          {activeProjects.map((project) => (
            <Card
              href={resolveHref("project", project.slug)!}
              key={project._id}
              title={project.title}
              image={project.image}
            >
              {project.duration && (
                <div className="text-gray-600 text-xs mb-2 flex gap-1">
                  {project.duration.start &&
                    formatTime(project.duration.start, "MMMM yyyy")}
                  <ArrowRightIcon className="inline-block h-4" />
                  {project.duration.end &&
                    formatTime(project.duration.end, "MMMM yyyy")}
                </div>
              )}
              <div className="text-gray-600 text-sm leading-normal line-clamp-3">
                {project.description}
              </div>
            </Card>
          ))}
        </div>
      )}
      {pastProjects.length > 0 && (
        <>
          <h2>Avsuttede prosjekter</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
            {pastProjects.map((project) => (
              <Card
                href={resolveHref("project", project.slug)!}
                key={project._id}
                title={project.title}
                image={project.image}
              >
                <div className="text-gray-600 text-sm leading-normal line-clamp-3">
                  {project.description}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </Container>
  );
}
