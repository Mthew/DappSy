import { AiOutlineDown } from "react-icons/ai";
import { Button, Divider, Dropdown, Space, Avatar } from "antd";
import React from "react";
import navigation from "../../config/navigation";

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
];
const App = () => {
  const menuStyle = {
    boxShadow: "none",
  };
  return (
    <Dropdown
      menu={{
        items: navigation,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar
            className="flex items-center"
            src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
          />
          <AiOutlineDown size={10} color={"white"}/>
        </Space>
      </a>
    </Dropdown>
  );
};
export default App;
