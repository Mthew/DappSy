import React, { useEffect, useContext } from "react";
import { Col, Space, Typography, Descriptions, Table } from "antd";
import { AiFillHeart } from "react-icons/ai";
import { FaEthereum, FaMinus, FaMoneyBillWave, FaPlus } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import { BsFillGrid1X2Fill } from "react-icons/bs";

//Context
import { ProjectContext, ProfileContext } from "../../context";

//Database
import { ProjectModel } from "../../database";

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

const Project = ({ project }) => {
  const { favorites = 50, setCurrentProject } = useContext(ProjectContext);
  const { isFavorite, addToFavorites } = useContext(ProfileContext);

  useEffect(() => {
    setCurrentProject(project);
  }, []);

  const handlers = {
    addFavorite() {
      addToFavorites(project.id, () => showSuccess("Agregado a favoritos"));
    },
  };

  return (
    <Layout title={project.name}>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Space direction="vertical" size={16}>
            {/* <Title color="white">{project.name}</Title> */}
            <Card
              className="rounded"
              hoverable
              title={project.name}
              extra={
                <Space direction="horizontal">
                  <Text>{favorites}</Text>
                  <AiFillHeart />
                </Space>
              }
              cover={<ProjectGallery imgs={project.imgs} />}
            >
              <ProjectFilesPreview files={project.documents} />
            </Card>
            <Card title="Descripción del Proyecto" hoverable>
              <Text>{project.description}</Text>
            </Card>
            <Card title="Detalles" hoverable>
              <Descriptions column={2} layout="vertical" bordered>
                <Descriptions.Item label="Categoria">
                  {project.category}
                </Descriptions.Item>
                <Descriptions.Item label="País">
                  {project.country}
                </Descriptions.Item>
                <Descriptions.Item label="Ciudad">
                  {project.city}
                </Descriptions.Item>
                <Descriptions.Item label="Ubicación">
                  {project.location}
                </Descriptions.Item>
                <Descriptions.Item label="Precio total" span={2}>
                  {`$${project.cost}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Descriptions.Item>
                <Descriptions.Item label="Cantidad">
                  {`${project.tokenCount}`.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    "."
                  )}{" "}
                  Tokens
                </Descriptions.Item>
                <Descriptions.Item label="Costo del token">
                  {`$${project.tokenCost}`.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Porcentaje de propiedad por token">
                  {showPercentage(project.tokenPercentage)}
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Card hoverable>
              <ProjectBuyTokensForm
                tokenCost={project.tokenCost}
                projectId={project.id}
              />
            </Card>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Space direction="vertical" size={16} className="max-w-full">
            <Card>
              {isFavorite(project.id) ? (
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

export const getStaticPaths = async (ctx) => {
  const allProjects = await ProjectModel.get();
  return {
    paths: allProjects.map(({ id }) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { id } = params;

  const project = await ProjectModel.getById(id);

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
