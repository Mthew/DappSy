import { useContext } from "react";
import { Form, Input, Button, Col, Modal } from "antd";

import { ProfileContext } from "../../context";

import { Card, Row } from "../ui";



const ProfileForm = ({}) => {
  const {
    profile = {},
    showForm,
    showProfileForm,
    saveProfileData,
  } = useContext(ProfileContext);
  const handlers = {
    async save(values) {
      await saveProfileData({
        id: profile.id,
        ...values,
      });
    },
    cancel() {
      showProfileForm(false);
    },
  };
  return (
    <Modal
      open={showForm}
      width={1000}
      centered
      destroyOnClose
      footer={null}
      closable={false}
      title={"Actualizar datos personales"}
    >
      <Form layout="vertical" onFinish={handlers.save} initialValues={profile}>
        <Card title={"INFORMACIÓN PERSONAL"} bordered={false}>
          <Row>
            <Col span={12}>
              <Form.Item
                label="Nombres"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "¡El campo Nombres es obligatorio!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Apellidos"
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: "¡El campo Apellidos es obligatorio!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="E-mail"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "¡El E-mail no tiene un formato valido!",
                  },
                  {
                    required: true,
                    message: "¡El campo E-mail es obligatorio!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title={"UBICACIÓN"} bordered={false}>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Dirección"
                name="location"
                rules={[
                  {
                    required: true,
                    message: "¡El campo Dirección es obligatorio!",
                  },
                ]}
              >
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
        <Card title={"ACERCA DE MI"} bordered={false}>
          <Row>
            <Col span={24}>
              <Form.Item label="Biografia" name="description">
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
