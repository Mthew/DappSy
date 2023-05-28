import { ProjectCard } from "./";
import { Title } from "../ui";

const ProjectCardList = ({ projects, title }) => {
  if ((projects || { length: 0 }).length === 0) return <></>;

  return projects.map((project, i) => (
    <>
      <Title>{title}</Title>
      <ProjectCard key={i} data={project} />
    </>
  ));
};

export default ProjectCardList;
