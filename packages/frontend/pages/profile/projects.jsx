import { useContext } from "react";

//Context
import { ProfileContext } from "../../context";

//Componenets
import { Layout } from "../../components/Layout";
import { ProjectCardList } from "../../components/Project";

const Projects = () => {
  const { profile = {} } = useContext(ProfileContext);
  if (profile == null) {
    return <>Loading...</>;
  }
  return (
    <Layout name="Proyectos Favoritos">
      <ProjectCardList
        projects={profile?.projects}
        title="Proyectos Creados"
        loadData
        brakePoints={{ xs: 24, sm: 12, md: 8, lg: 8, xl: 8 }}
      />
    </Layout>
  );
};

export default Projects;
