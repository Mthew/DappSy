import React, { useEffect, useContext } from "react";
import { useRouter, useParams } from "next/navigation";
import { Col, Space, Typography, Descriptions } from "antd";
import { AiFillHeart } from "react-icons/ai";

//Context
import { ProjectContext, ProfileContext } from "../../context";

//Components
import { Layout } from "../../components/Layout";
import { Row, Card, Button } from "../../components/ui";
import {
  SalehistoryChart,
  ProjectFilesPreview,
  ProjectGallery,
  ProjectBuyTokensForm,
  ProjectStats,
  TransactionHistory,
} from "../../components/Project";
import { showPercentage, showSuccess } from "../../utils";

const Text = Typography.Text;

const project = {};

const Project = ({}) => {
  const params = useParams();
  const router = useRouter();

  const {
    favorites = 50,
    setCurrentProject,
    currentProject,
  } = useContext(ProjectContext);
  const { isFavorite, addToFavorites } = useContext(ProfileContext);

  useEffect(() => {
    const pathname = document.location.pathname.split("/");
    const id = pathname[pathname.length - 1];
    setCurrentProject(id);
  }, []);

  const handlers = {
    addFavorite() {
      addToFavorites(currentProject?.id, () =>
        showSuccess("Agregado a favoritos")
      );
    },
  };

  return (
    <Layout title={currentProject?.name}>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Space direction="vertical" size={16}>
            {/* <Title color="white">{currentProject?.name}</Title> */}
            <Card
              className="rounded"
              hoverable
              title={currentProject?.name}
              extra={
                <Space direction="horizontal">
                  <Text>{favorites}</Text>
                  <AiFillHeart />
                </Space>
              }
              cover={<ProjectGallery imgs={currentProject?.imgs} />}
            >
              <ProjectFilesPreview files={currentProject?.documents} />
            </Card>
            <Card title="Descripción del Proyecto" hoverable>
              <Text>{currentProject?.description}</Text>
            </Card>
            <Card title="Detalles" hoverable>
              <Descriptions column={2} layout="vertical" bordered>
                <Descriptions.Item label="Categoria">
                  {currentProject?.category}
                </Descriptions.Item>
                <Descriptions.Item label="País">
                  {currentProject?.country}
                </Descriptions.Item>
                <Descriptions.Item label="Ciudad">
                  {currentProject?.city}
                </Descriptions.Item>
                <Descriptions.Item label="Ubicación">
                  {currentProject?.location}
                </Descriptions.Item>
                <Descriptions.Item label="Precio total" span={2}>
                  {`${currentProject?.cost}`.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )}
                  {" ETH"}
                </Descriptions.Item>
                <Descriptions.Item label="Cantidad">
                  {`${currentProject?.tokenCount}`.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    "."
                  )}{" "}
                  Tokens
                </Descriptions.Item>
                <Descriptions.Item label="Costo del token">
                  {`${currentProject?.tokenCost}`.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )}
                  {" ETH"}
                </Descriptions.Item>
                <Descriptions.Item label="Porcentaje de propiedad por token">
                  {showPercentage(currentProject?.tokenPercentage)}
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Card hoverable>
              <ProjectBuyTokensForm
                tokenCost={currentProject?.tokenCost}
                projectKey={currentProject?.projectKey}
                projectId={currentProject?.id}
              />
            </Card>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Space direction="vertical" size={16} className="max-w-full">
            <Card>
              {isFavorite(currentProject?.id) ? (
                <Button icon={<AiFillHeart size={20} />} type="link">
                  Favorito
                </Button>
              ) : (
                <Button
                  icon={<AiFillHeart size={20} />}
                  type="default"
                  onClick={handlers.addFavorite}
                >
                  Agregar a favoritos
                </Button>
              )}
            </Card>
            <Card>
              <ProjectStats />
            </Card>
            <Card title={"Historial de transacciones"} hoverable>
              <TransactionHistory />
            </Card>
            <Card>
              <SalehistoryChart />
            </Card>
          </Space>
        </Col>
      </Row>
      <Row></Row>
    </Layout>
  );
};

export default Project;
