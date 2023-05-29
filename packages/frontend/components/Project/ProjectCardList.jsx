import { Col } from "antd";

import { ProjectCard } from "./";
import { Title, Row } from "../ui";

const ProjectCardList = ({
  projects,
  title,
  loadData = false,
  brakePoints,
}) => {
  console.log("projects ======>", projects)
  if ((projects || { length: 0 }).length === 0) return <></>;

  console.log("projectsss ======>", projects)
  return (
    <Row>
      {title && (
        <Col span={24}>
          <Title level={3} className="my-20">{title}</Title>
        </Col>
      )}
      {projects.map((id, i) => (
        <Col key={i} {...(brakePoints || { xs: 24, sm: 12, md: 8, lg: 6, xl: 4 })}>
          <ProjectCard data={{ id }} loadData={loadData} />
        </Col>
      ))}
    </Row>
  );
};

export default ProjectCardList;


