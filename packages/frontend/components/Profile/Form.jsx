import React from "react";
import { Form, Input, Button, Col, Modal } from "antd";

import { Card, Title, Row } from "../ui";

const ProfileForm = ({ visible, close = () => {} }) => {
  const handlers = {
    save() {},
    cancel() {
      close();
    },
  };
  return (
    <Modal
      open={visible}
      width={1000}
      centered
      destroyOnClose
      footer={null}
      closable={false}
      title={"Actualizar datos personales"}
    >
      <Form layout="vertical" onFinish={handlers.save}>
        <Card title={"INFORMACIÓN PERSONAL"} bordered={false}>
          <Row>
            <Col span={12}>
              <Form.Item label="Nombres" name="name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Apellidos" name="lastname">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="email" name="email">
                <Input />
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
        <Card title={"Acerca de mi"} bordered={false}>
          <Row>
            <Col span={24}>
              <Form.Item label="Biografia" name="bio">
                <Input.TextArea showCount maxLength={255} />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"end"}>
            <Col span={8} style={{ display: "flex", flexDirection: "column" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
              >
                Guardar
              </Button>
              <Button onClick={handlers.cancel}>Cancelar</Button>
            </Col>
          </Row>
        </Card>
      </Form>
    </Modal>
  );
};

export default ProfileForm;
