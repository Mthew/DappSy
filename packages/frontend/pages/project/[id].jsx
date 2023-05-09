import React from "react";
import ProjectRepository from "../../database/projectRepository";
import { Layout } from "../../components/Layout";

const Project = ({ project }) => {
  return (
    <Layout>      
      <h1>{project.name}</h1>
    </Layout>
  );
};

export const getStaticPaths = async (ctx) => {
  const allProjects = await new ProjectRepository().getAllDocuments();
  return {
    paths: allProjects.map(({ id }) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { id } = params;

  const project = await new ProjectRepository().getById(id);

  if (!project) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      project,
    },
    revalidate: 86400, // 60 * 60 * 24
  };
};

export default Project;
