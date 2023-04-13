import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Card,
} from "antd";
import React, { useState } from "react";

import Layout from "../../components/Layout";
import { MediaUpload, FileUpload } from "../../components/Project";
import { CardContainer } from "../../components/Shared";

export default () => {
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
            <MediaUpload />
          </CardContainer>
          <CardContainer
            title="Imagenes o videos"
            subtitle={
              "Tipos de archivos compatibles: JPG, PNG y PDF. Tamaño máximo: 100 MB"
            }
          >
            <FileUpload />
          </CardContainer>
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <CardContainer title="Crear Nuevo Proyecto">
            <Form>
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
                    <Form.Item label="Categoria" name="category">
                      <Input.TextArea showCount maxLength={255} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Card title={"UBICACIÓN"} bordered={false}>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Dirección" name="address">
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
                    <Form.Item label="% de valorización por token" name="tokenPersentage">
                      <Input />
                    </Form.Item>
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
