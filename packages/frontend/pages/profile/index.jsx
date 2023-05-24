import { useContext, useEffect } from "react";
import { Space, Col, Typography, Button } from "antd";

//Contexts
import { ProfileContext, AuthContext } from "../../context";

//Componentes
import { Layout } from "../../components/Layout";
import { Row, Title } from "../../components/ui";
import { CoverPhoto, Info } from "../../components/Profile";

const Text = Typography.Text;

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
          <Title className={"mt-12"} level={3}>
            No tiene proyectos creados
          </Title>
          <Title className={"mt-12"} level={3}>
            No ha comprado ningún tokens
          </Title>
          <Title className={"mt-12"} level={3}>
            No tiene proyectos favoritos
          </Title>
          {/* liostar proyectos creados */}
        </Col>
        <Col xs={24} sm={24} md={8} xl={8} xxl={8}>
          <Info />
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
