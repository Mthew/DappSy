import { Space, Col, Typography, Button } from "antd";

import { Layout } from "../../components/Layout";
import { Row, Title } from "../../components/ui";
import { CoverPhoto, Info } from "../../components/Profile";

const user = {
  name: "Jessica Jones",
  status:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, quidem!",
  profilePhoto: "",
  coverPhoto: "",
  email: "jessicajones@gmail.com",
  location: "cra 22 # 33a - 28",
  city: "Medellin - Colombia",
  bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis praesentium non sed, explicabo magni nisi sint est officia quis modi!",
  projects: [],
  tokens: [],
  favorites: [],
};
const Text = Typography.Text;

const Profile = ({}) => {
  return (
    <Layout title="Perfil">
      <CoverPhoto
        photoSrc={
          "https://www.shutterstock.com/image-photo/photo-cute-adorable-young-woman-260nw-1864510012.jpg"
        }
      />
      <Row>
        <Col span={24}>
          <Space direction="vertical" size={16}>
            <Title color="white">{user.name}</Title>
            <Text style={{ color: "white" }}>{user.status}</Text>
            <Button type="primary">Editar perfil</Button>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={16} xl={16} xxl={16}>
          <Title className={"mt-12"} level={3}>
            aun no tiene proyectos creados
          </Title>
          <Title className={"mt-12"} level={3}>
            aun no tiene tokens comprados
          </Title>
          <Title className={"mt-12"} level={3}>
            aun no tiene proyectos favoritos
          </Title>
          {/* liostar proyectos creados */}
        </Col>
        <Col xs={24} sm={24} md={8} xl={8} xxl={8}>
          <Info user={user}/>
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
