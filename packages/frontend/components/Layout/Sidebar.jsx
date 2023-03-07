import React, { useState } from "react";
import { Button, Menu } from "antd";
import { AiMenuUnfoldOutlined, AiMenuFoldOutlined } from "react-icons";

import navigation, { createMenuItem } from "../../config/navigation";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      style={{
        width: 256,
      }}
    >
      {/* <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <AiMenuUnfoldOutlined /> : <AiMenuFoldOutlined />}
      </Button> */}
      {/* <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={navigation && navigation.map((item, i) => createMenuItem({ key: i, ...item }))}
      /> */}
    </div>
  );
};
export default Sidebar;
