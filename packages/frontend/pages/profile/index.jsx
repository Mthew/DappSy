import { useContext, useEffect } from "react";
import { Space, Col, Typography, Button } from "antd";

//Contexts
import { ProfileContext } from "../../context";

//Componentes
import { Layout } from "../../components/Layout";
import { Row, Title } from "../../components/ui";
import { CoverPhoto, Info } from "../../components/Profile";
import { ProjectCardList } from "../../components/Project";

const Text = Typography.Text;

const Profile = ({}) => {
  const { profile = {}, showProfileForm } = useContext(ProfileContext);
  console.log("profile ======>", profile);
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
          <Space direction="vertical" size={16} className="mb-20">
            <Title color="white">{profile?.name}</Title>
            <Text style={{ color: "white" }}>{profile?.status}</Text>
            <Button type="primary" onClick={() => showProfileForm(true)}>
              Editar perfil
            </Button>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          md={{ span: 12, order: 1 }}
          xl={{ span: 18, order: 1 }}
          xxl={{ span: 18, order: 1 }}
        >
          <ProjectCardList
            projects={profile?.projects}
            title="Proyectos Creados"
            loadData
            brakePoints={{ xs: 24, sm: 12, md: 8, lg: 8, xl: 8 }}
          />
          {/* {profile?.tokens && (
            <ProjectCardList
              projects={profile?.tokens?.map((token) => token.projectId)}
              title="Tokens Adquiridos"
              loadData
              brakePoints={{ xs: 24, sm: 12, md: 8, lg: 8, xl: 8 }}
            />
          )} */}
          <ProjectCardList
            projects={profile?.favorites}
            title="proyectos favoritos"
            loadData
            brakePoints={{ xs: 24, sm: 12, md: 8, lg: 8, xl: 8 }}
          />
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 8, order: 2 }}
          xl={{ span: 6, order: 2 }}
          xxl={{ span: 6, order: 2 }}
        >
          <Info />
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
