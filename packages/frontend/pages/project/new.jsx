import React, { useState } from "react";
import { useRouter } from "next/router";
import { Col, Form, Input, Row, Card, Button } from "antd";
import axios from "axios";

import { Layout } from "../../components/Layout";
import { MediaUpload, FileUpload } from "../../components/Project";
import { CardContainer } from "../../components/Shared";
import { ROUTES } from "../../utils";

const NewProject = () => {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const router = useRouter();

  const handlers = {
    async save(values) {
      console.log("FORMULARIO", values);
      console.log("Images", images);
      values.imgs = images.map(img => img.response.data);
      
      const res = await axios.post("/api/project/new", values);
      if (res.status != 200) {
        alert("Ocurrio un error al guardar");
        return;
      }
      console.log("RESPONSE ==>", res);
      const json = res.data;
      console.log("RESPONSE JSON ==>", json);
      router.replace(ROUTES.home);
    },
    addImage: (newImages) => setImages(newImages),
    addFile: (newFiles) => setFiles(newFiles),
  };
  return (
    <Layout>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <CardContainer
            title="Imagenes o videos"
            subtitle={
              "Tipos de archivos compatibles: JPG, PNG, SVG, MP4, WEBM, WAV. Tamaño máximo: 100 MB"
            }
          >
            <MediaUpload onChange={handlers.addImage}/>
          </CardContainer>
          <CardContainer
            title="Imagenes o videos"
            subtitle={
              "Tipos de archivos compatibles: JPG, PNG y PDF. Tamaño máximo: 100 MB"
            }
          >
            <FileUpload onChange={handlers.addFile}/>
          </CardContainer>
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <CardContainer title="Crear Nuevo Proyecto">
            <Form layout="vertical" onFinish={handlers.save}>
              <Card title={"INFORMACIÓN GENERAL"} bordered={false}>
                <Row gutter={[16, 16]}>
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
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Form.Item label="Descripción" name="description">
                      <Input.TextArea showCount maxLength={255} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Card title={"UBICACIÓN"} bordered={false}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Form.Item label="Dirección" name="location">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
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
                <Row gutter={[16, 16]}>
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
                <Row gutter={[16, 16]} justify={"end"}>
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
