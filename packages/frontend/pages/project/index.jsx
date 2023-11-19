import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Col,
  Form,
  Input,
  Card,
  Button,
  Space,
  InputNumber,
  Select,
  Cascader,
} from "antd";
import { useSession } from "next-auth/react";

//Context
import { ProjectContext, ProfileContext } from "../../context";

//Components
import { Layout } from "../../components/Layout";
import { MediaUpload, FileUpload } from "../../components/Project";
import { Row, CardContainer } from "../../components/ui";

import {
  ROUTES,
  PROJECT_CATEGORIES,
  showError,
  showWarningAlert,
  showInfo,
} from "../../utils";

const NewProject = () => {
  const {
    createProject,
    contractIsLoading,
    contractIsSuccess,
    contractData,
    contractisError,
    contractError,
    writeAsync,
  } = useContext(ProjectContext);
  const { profile, validateProfileConfirmed } = useContext(ProfileContext);
  const { status } = useSession();

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  const [form] = Form.useForm();
  const projectCost = Form.useWatch("cost", form);
  const tokenCount = Form.useWatch("tokenCount", form);

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      showWarningAlert({
        title: "Sin autorización",
        message:
          "Para poder crear un proyecto, primero debe de iniciar sesión con una wallet de metamask",
        onOk: () => router.replace(ROUTES.login),
      });
    }
  }, [status]);

  useEffect(() => {
    if (projectCost && tokenCount) {
      const tokenCost = projectCost / tokenCount;
      const tokenPercentage = (tokenCost * 100) / projectCost;
      form.setFieldsValue({ tokenCost });
      form.setFieldsValue({ tokenPercentage });
    }
  }, [projectCost, tokenCount]);

  useEffect(() => {
    validateProfileConfirmed();
  }, [profile]);

  const handlers = {
    async save(values) {
      if (images.length == 0)
        return showError("Debe agregar al menos una imagen");
      if (files.length == 0)
        return showError("Debe agregar al menos un archivo");

      values.imgs = images.map((img) => img.response.data);
      values.documents = files.map((file) => file.name);

      createProject(values, () => router.replace(ROUTES.home));
    },
    addImage: (newImages) => setImages(newImages),
    addFile: (newFiles) => setFiles(newFiles),
    generateValuePercentage: (value) => {},
  };
  return (
    <Layout title={"Creación de Proyecto"}>
      <Row>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Space size={[16, 16]} direction="vertical" style={{ width: "100%" }}>
            <CardContainer
              title="Imagenes o videos"
              subtitle={
                "Tipos de archivos compatibles: JPG, PNG, SVG, MP4, WEBM, WAV. Tamaño máximo: 100 MB"
              }
              style={{ width: "100%" }}
            >
              <MediaUpload onChange={handlers.addImage} />
            </CardContainer>
            <CardContainer
              title="Documentos"
              subtitle={
                "Tipos de archivos compatibles: JPG, PNG y PDF. Tamaño máximo: 100 MB"
              }
            >
              <FileUpload onChange={handlers.addFile} />
            </CardContainer>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <CardContainer title="Información del Proyecto">
            <Form layout="vertical" onFinish={handlers.save} form={form}>
              <Card title={"INFORMACIÓN GENERAL"} bordered={false}>
                <Row>
                  <Col span={12}>
                    <Form.Item label="Nombre del Proyecto" name="name">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Categoria" name="category">
                      <Select>
                        {PROJECT_CATEGORIES.map((category, i) => (
                          <Select.Option key={i} value={category}>
                            {category}
                          </Select.Option>
                        ))}
                      </Select>
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
                  <Col span={24}>
                    <Form.Item label="País" name="city">
                      <Cascader
                        options={[
                          {
                            value: "Colombia",
                            label: "Colombia",
                            children: [
                              {
                                value: "Antioquia",
                                label: "Antioquia",
                                children: [
                                  {
                                    value: "Medellin",
                                    label: "Medellin",
                                  },
                                  {
                                    value: "Bello",
                                    label: "Bello",
                                  },
                                  {
                                    value: "Sabaneta",
                                    label: "Sabaneta",
                                  },
                                  {
                                    value: "Envigado",
                                    label: "Envigado",
                                  },
                                  {
                                    value: "Itagüi",
                                    label: "Itagüi",
                                  },
                                  {
                                    value: "La Estrella",
                                    label: "La Estrella",
                                  },
                                ],
                              },
                            ],
                          },
                        ]}
                      />
                      {/* <Input /> */}
                    </Form.Item>
                  </Col>
                  {/* <Col span={8}>
                    <Form.Item label="Ciudad" name="city">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Postal" name="postalCode">
                      <Input />
                    </Form.Item>
                  </Col> */}
                </Row>
              </Card>
              <Card title={"INFORMACIÓN ECONOMICA"} bordered={false}>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="Costo del proyecto"
                      name="cost"
                      id="cost"
                      rules={[
                        {
                          required: true,
                          message: "¡El Costo del proyecto es requerido!",
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        prefix={"ETH"}
                        style={{ width: "100%" }}
                        formatter={(value) =>
                          ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Cantidad de Tokens"
                      name="tokenCount"
                      id="tokenCount"
                      rules={[
                        {
                          required: true,
                          message: "¡La Cantidad de Tokens es requerida!",
                        },
                      ]}
                    >
                      <InputNumber min={1} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Costo por token"
                      name="tokenCost"
                      id="tokenCost"
                    >
                      <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        prefix={"ETH"}
                        formatter={(value) =>
                          ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="% de valorización por token"
                      name="tokenPercentage"
                      id="tokenPercentage"
                      disabled
                    >
                      <InputNumber
                        min={0}
                        max={100}
                        formatter={(value) => `${value}%`}
                        parser={(value) => value.replace("%", "")}
                        style={{ width: "100%" }}
                        disabled
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"end"}>
                  <Col span={10} className="flex gap-5 content-end">
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={contractIsLoading}
                      loading={contractIsLoading}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                    >
                      {contractIsLoading ? "Crear Proyecto" : "Calcular GAS"}
                    </Button>
                    <Button>Cancelar</Button>
                  </Col>
                  {contractIsLoading && <div>Check Wallet</div>}
                </Row>
                {/* {contractIsSuccess && (
                  <div>Transaction: {JSON.stringify(contractData)}</div>
                )} */}
              </Card>
            </Form>
          </CardContainer>
        </Col>
      </Row>
    </Layout>
  );
};

export default NewProject;
