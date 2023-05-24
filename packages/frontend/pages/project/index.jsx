import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Col, Form, Input, Card, Button, Space } from "antd";

//Context
import { ProjectContext } from "../../context";

//Components
import { Layout } from "../../components/Layout";
import { MediaUpload, FileUpload } from "../../components/Project";
import { Row } from "../../components/ui";
import { CardContainer } from "../../components/Shared";

import { ROUTES } from "../../utils";

const NewProject = () => {
  const { createProject } = useContext(ProjectContext);

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const router = useRouter();

  const handlers = {
    async save(values) {
      values.imgs = images.map((img) => img.response.data);
      createProject(values);
      router.replace(ROUTES.home);
    },
    addImage: (newImages) => setImages(newImages),
    addFile: (newFiles) => setFiles(newFiles),
  };
  return (
    <Layout>
      <Row>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Space size={[16, 16]} direction="vertical">
            <CardContainer
              title="Imagenes o videos"
              subtitle={
                "Tipos de archivos compatibles: JPG, PNG, SVG, MP4, WEBM, WAV. Tamaño máximo: 100 MB"
              }
            >
              <MediaUpload onChange={handlers.addImage} />
            </CardContainer>
            <CardContainer
              title="Imagenes o videos"
              subtitle={
                "Tipos de archivos compatibles: JPG, PNG y PDF. Tamaño máximo: 100 MB"
              }
            >
              <FileUpload onChange={handlers.addFile} />
            </CardContainer>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <CardContainer title="Crear Nuevo Proyecto">
            <Form layout="vertical" onFinish={handlers.save}>
              <Card title={"INFORMACIÓN GENERAL"} bordered={false}>
                <Row>
                  <Col span={12}>
                    <Form.Item label="Nombre del Proyecto" name="name">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Categoria" name="category">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Descripción" name="description">
                      <Input.TextArea showCount maxLength={255} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Card title={"UBICACIÓN"} bordered={false}>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Dirección" name="location">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Form.Item label="País" name="country">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Ciudad" name="city">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Postal" name="postalCode">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Card title={"VALORACIÓN"} bordered={false}>
                <Row>
                  <Col span={8}>
                    <Form.Item label="Costo" name="cost">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Cantidad de Tokens" name="tokenCount">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="% de valorización por token"
                      name="tokenPersentage"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"end"}>
                  <Col
                    span={3}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                    >
                      Guardar
                    </Button>
                    <Button>Cancelar</Button>
                  </Col>
                </Row>
              </Card>
            </Form>
          </CardContainer>
        </Col>
      </Row>
    </Layout>
  );
};

export default NewProject;
