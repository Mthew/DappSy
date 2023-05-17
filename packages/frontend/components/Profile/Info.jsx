import { useState } from "react";
import { Space, Button, Divider, Avatar, Typography } from "antd";
import { AiFillEdit } from "react-icons/ai";

import { Card, Title } from "../ui";
import { Form } from "./";

const Text = Typography.Text;

const Info = ({ user }) => {
  const [formVisible, setFormVisible] = useState(false);

  const handlers = {
    edit() {
      setFormVisible(true);
    },
    close() {
      setFormVisible(false);
    },
  };
  return (
    <>
      <Form visible={formVisible} close={handlers.close} />
      <Card
        extra={<AiFillEdit size={28} onClick={handlers.edit} />}
        title={
          <div className="w-100 text-center">
            <Avatar
              size={150}
              style={{ top: "-70px", left: "28%" }}
              className="flex items-center mx-auto absolute"
              src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
            />
          </div>
        }
      >
        <Space direction="vertical" align="center" size={16}>
          <Space direction="horizontal">
            <Button
              type="text"
              icon={<Title level={3}>{user.tokens.length}</Title>}
            >
              tokens
            </Button>
            <Button
              type="text"
              icon={<Title level={3}>{user.projects.length}</Title>}
            >
              proyectos
            </Button>
            <Button
              type="text"
              icon={<Title level={3}>{user.favorites.length}</Title>}
            >
              favoritos
            </Button>
          </Space>
          <Title className="mt-10" level={3}>
            {user.name}
          </Title>
          <Text level={4}>{user.city}</Text>
          <Text level={4}>{user.location}</Text>
          <Text level={4}>{user.email}</Text>
          <Divider />
          <Text style={{ textAlign: "left" }} level={4}>
            Bio
          </Text>
          <Text level={4}>{user.bio}</Text>
        </Space>
      </Card>
    </>
  );
};

export default Info;
