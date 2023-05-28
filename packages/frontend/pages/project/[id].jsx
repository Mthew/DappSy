import React, { useState, useContext } from "react";
import {
  Col,
  Space,
  Typography,
  Descriptions,
  Table,
  InputNumber,
  Popconfirm,
  Input,
  Form,
} from "antd";
import { AiFillHeart } from "react-icons/ai";
import { FaEthereum, FaMinus, FaMoneyBillWave, FaPlus } from "react-icons/fa";
import { MdGroup } from "react-icons/md";
import { BsFillGrid1X2Fill, BsPercent } from "react-icons/bs";

//Context
import { ProjectContext, ProfileContext, SignerContext } from "../../context";

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
} from "../../components/Project";
import { showError } from "../../utils";

const Text = Typography.Text;

const dataSource = [
  {
    unitPrice: "0.3",
    unitPriceUSD: "$391.57",
    quantity: 1,
    floorDiff: "67% debajo",
    expiredTime: "2 dias",
  },
  {
    unitPrice: "0.3",
    unitPriceUSD: "$391.57",
    quantity: 1,
    floorDiff: "67% debajo",
    expiredTime: "2 dias",
  },
  {
    unitPrice: "0.3",
    unitPriceUSD: "$391.57",
    quantity: 1,
    floorDiff: "67% debajo",
    expiredTime: "2 dias",
  },
  {
    unitPrice: "0.3",
    unitPriceUSD: "$391.57",
    quantity: 1,
    floorDiff: "67% debajo",
    expiredTime: "2 dias",
  },
  {
    unitPrice: "0.3",
    unitPriceUSD: "$391.57",
    quantity: 1,
    floorDiff: "67% debajo",
    expiredTime: "2 dias",
  },
  {
    unitPrice: "0.3",
    unitPriceUSD: "$391.57",
    quantity: 1,
    floorDiff: "67% debajo",
    expiredTime: "2 dias",
  },
];

const columns = [
  {
    title: "Precio Unitario",
    dataIndex: "unitPrice",
    key: "unitPrice",
    render: (text) => (
      <>
        <FaEthereum /> {text} WETH
      </>
    ),
  },
  {
    title: "Precio Unitario en USD",
    dataIndex: "unitPriceUSD",
    key: "unitPriceUSD",
  },
  {
    title: "Cantidad",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Diferencia de Suelo",
    dataIndex: "floorDiff",
    key: "floorDiff",
  },
  {
    title: "Vencimiento",
    dataIndex: "expiredTime",
    key: "expiredTime",
  },
];

const TransactionList = () => (
  <Table dataSource={dataSource} columns={columns} />
);

const Project = ({ project }) => {
  const { favorites = 50 } = useContext(ProjectContext);
  const { isFavorite, addToFavorites } = useContext(ProfileContext);

  const handlers = {
    addFavorite() {
      addToFavorites(project.id);
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
                  {`${project.tokenPercentage || 0}%`}
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Card hoverable>
              <ProjectBuyTokensForm tokenCost={project.tokenCost} projectId={project.id}/>
            </Card>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Space direction="vertical" size={16}>
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
              <Button icon={<MdGroup size={20} />} type="text">
                10 Propietarios
              </Button>
              <Button icon={<BsFillGrid1X2Fill size={20} />} type="text">
                {`${project.tokenCount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                Tokens
              </Button>
              <Button icon={<FaMoneyBillWave size={20} />} type="text">
                {`$${project.tokenCost}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Button>
              <Button icon={<BsPercent size={20} />} type="text">
                30% vendido
              </Button>
            </Card>
            <Card title={"Historial de ofertas"} hoverable>
              <TransactionList />
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
