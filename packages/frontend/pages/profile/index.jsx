import { useContext, useEffect } from "react";
import { Space, Col, Typography, Button } from "antd";

//Contexts
import { ProfileContext, AuthContext } from "../../context";

//Componentes
import { Layout } from "../../components/Layout";
import { Row, Title } from "../../components/ui";
import { CoverPhoto, Info } from "../../components/Profile";

const Text = Typography.Text;

const ProjectList = ({ projects, title }) => {
  if ((projects || { length: 0 }).length === 0)
    return (
      <Title className={"mt-12"} level={3}>
        No hay {title} creados
      </Title>
    );

  return projects.map((project, i) => (
    <>
      <Title className={"mt-12"} level={3}>
        {title}
      </Title>
      <ProjectCard key={i} data={project} />
    </>
  ));
};

const Profile = ({}) => {
  const { user } = useContext(AuthContext);
  const {
    getProfileInfo,
    profile = {},
    showProfileForm,
  } = useContext(ProfileContext);

  useEffect(() => {
    if (user) {
      getProfileInfo(user.name);
    }
  }, [user]);

  return (
    <Layout title="Perfil">
      <CoverPhoto
        photoSrc={
          profile?.coverPhoto ||
          "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
        }
      />
      <Row>
        <Col span={24}>
          <Space direction="vertical" size={16}>
            <Title color="white">{profile?.name}</Title>
            <Text style={{ color: "white" }}>{profile?.status}</Text>
            <Button type="primary" onClick={() => showProfileForm(true)}>
              Editar perfil
            </Button>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={16} xl={16} xxl={16}>
          <ProjectList projects={profile?.projects} title="proyectos" />
          <ProjectList projects={profile?.tokens} title="tokens" />
          <ProjectList
            projects={profile?.favorites}
            title="proyectos favoritos"
          />
        </Col>
        <Col xs={24} sm={24} md={8} xl={8} xxl={8}>
          <Info />
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
