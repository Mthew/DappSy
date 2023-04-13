import { useState } from "react";
import { Menu as MenuAnt, Layout } from "antd";

import navigation from "../../config/navigation";
import { Logo } from "../ui";

const { Sider } = Layout;

export default function Menu() {  
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}            
      className="bg-slate-200"
    >
      <Logo className="text-dark" />
      <MenuAnt
      className="bg-slate-200"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={navigation}
      />
    </Sider>
  );
}
