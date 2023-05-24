import { useState, useContext } from "react";
import { Space, Button, Divider, Avatar, Typography } from "antd";
import { AiFillEdit } from "react-icons/ai";

import { ProfileContext } from "../../context";

import { Card, Title } from "../ui";
import { Form } from "./";

const Text = Typography.Text;

const Info = ({}) => {
  const { profile = {}, showForm, showProfileForm } = useContext(ProfileContext);

  const handlers = {
    edit() {
      showProfileForm(true);
    },
    close() {
      showProfileForm(false);
    },
  };
  return (
    <>
      <Form visible={showForm} close={handlers.close} />
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
              icon={
                <Title level={3}>
                  {(profile?.tokens || { length: 0 }).length}
                </Title>
              }
            >
              tokens
            </Button>
            <Button
              type="text"
              icon={
                <Title level={3}>
                  {(profile?.projects || { length: 0 }).length}
                </Title>
              }
            >
              proyectos
            </Button>
            <Button
              type="text"
              icon={
                <Title level={3}>
                  {(profile?.favorites || { length: 0 }).length}
                </Title>
              }
            >
              favoritos
            </Button>
          </Space>
          <Title className="mt-10" level={3}>
            {profile?.name}
          </Title>
          <Text level={4}>{profile?.city}</Text>
          <Text level={4}>{profile?.location}</Text>
          <Text level={4}>{profile?.email}</Text>
          <Divider />
          <Text style={{ textAlign: "left" }} level={4}>
            Bio
          </Text>
          <Text level={4}>{profile?.bio}</Text>
        </Space>
      </Card>
    </>
  );
};

export default Info;
