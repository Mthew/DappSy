import { useContext, useEffect } from "react";
import { Space, Col, Typography, Button } from "antd";

//Contexts
import { ProfileContext, AuthContext } from "../../context";

//Componentes
import { Layout } from "../../components/Layout";
import { Row, Title } from "../../components/ui";
import { CoverPhoto, Info } from "../../components/Profile";
import { ProjectCardList } from "../../components/Project";

const Text = Typography.Text;



const Profile = ({}) => {
  const {
    profile = {},
    showProfileForm,
  } = useContext(ProfileContext);

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
          <ProjectCardList projects={profile?.projects} title="proyectos" />
          <ProjectCardList projects={profile?.tokens} title="tokens" />
          <ProjectCardList
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
