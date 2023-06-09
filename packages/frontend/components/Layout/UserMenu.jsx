import Link from "next/link";
import { useSession } from "next-auth/react";
import { AiOutlineDown } from "react-icons/ai";
import { Dropdown, Space, Avatar } from "antd";
import navigation from "../../config/navigation";
import { ROUTES } from "../../utils";

const App = () => {
  const { status } = useSession();
  const menuStyle = {
    boxShadow: "none",
  };
  return status === "authenticated" ? (
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
          <AiOutlineDown size={10} color={"white"} />
        </Space>
      </a>
    </Dropdown>
  ) : (
    <Link href={ROUTES.login}>Iniciar sesion</Link>
  );
};
export default App;
