import React, { useState, useContext } from "react";
import {
  Col,
  Space,
  Image,
  Typography,
  Descriptions,
  Table,
  InputNumber,
} from "antd";
import { AiFillHeart } from "react-icons/ai";
import { FaEthereum, FaMinus, FaPlus } from "react-icons/fa";
import { MdGroup } from "react-icons/md";
import { BsEyeFill, BsFillGrid1X2Fill } from "react-icons/bs";

//Context
import { ProjectContext, ProfileContext } from "../../context";

//Database
import { ProjectModel } from "../../database";

//Components
import { Layout } from "../../components/Layout";
import { Row, Card, Button } from "../../components/ui";
import { SalehistoryChart } from "../../components/Project";

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

const ProjectGallery = ({ imgs }) => {
  const [previewImg, setPreviewImg] = useState(false);
  return (
    <>
      <Image
        preview={{
          previewImg: false,
        }}
        src={imgs[0]}
        onClick={() => setPreviewImg(true)}
      />
      <div
        style={{
          display: "none",
        }}
      >
        <Image.PreviewGroup
          preview={{
            previewImg,
            onVisibleChange: (vis) => setPreviewImg(vis),
          }}
        >
          {imgs.map((img, i) => (
            <Image src={img} key={i} />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  );
};

const Project = ({ project }) => {
  const { addTokens, lessTokens, tokens } = useContext(ProjectContext);
  const { isFavorite, addToFavorites } = useContext(ProfileContext);
  const handlers = {
    addFavorite(){
      addToFavorites(project.id);
    }
  }
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
                  <Text>43</Text>
                  <AiFillHeart />
                </Space>
              }
              cover={<ProjectGallery imgs={project.imgs} />}
            />
            <Card title="Descripción del Proyecto" hoverable>
              <Text>{project.description}</Text>
            </Card>
            <Card title="Detalles" hoverable>
              <Descriptions column={2}>
                <Descriptions.Item label="País">
                  {project.country}
                </Descriptions.Item>
                <Descriptions.Item label="Ciudad">
                  {project.city}
                </Descriptions.Item>
                <Descriptions.Item label="Ubicación">
                  {project.location}
                </Descriptions.Item>
                <Descriptions.Item label="Costo del Token">
                  ${Number(project.cost) / Number(project.tokenCount)}
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Card hoverable>
              <Space>
                <InputNumber
                  addonBefore={<FaPlus onClick={addTokens} />}
                  addonAfter={<FaMinus onClick={lessTokens} />}
                  step={1}
                  min={1}
                  value={tokens}
                  {...(project.maxTokenByuser
                    ? { max: project.maxTokenByuser }
                    : {})}
                />
                <Button>Comprar tokens </Button>
              </Space>
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
                10 Total
              </Button>
              <Button icon={<BsEyeFill size={20} />} type="text">
                5.0k vizualizaciones
              </Button>
              <Button icon={<AiFillHeart size={20} />} type="text">
                50 Favoritos
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
