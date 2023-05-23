import { signOut, useSession } from "next-auth/react";
import { useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Layout, Typography, Space, Button, Input, Avatar } from "antd";
import {
  AiOutlineSearch,
  AiFillWallet,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { UserMenu } from "./";
import { Logo } from "../ui";

const { Header } = Layout;
const { Title } = Typography;

export default function NavBar({ title }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const { disconnect } = useDisconnect();

  return (
    <Header className="px-4 z-10 bg-transparent">
      <nav className="relative flex h-16 items-center justify-between">
        <Logo className="text-white" loading={loading} redirectToHome />
        <div className="grow">
          <Input
            suffix={<AiOutlineSearch />}
            width={"100%"}
            className="flex items-center rounded"
          />
        </div>
        <Space className="ml-3 flex-none table-grid">
          <Button
            className="text-white inline-flex items-center"
            icon={<AiOutlineShoppingCart size={25} />}
            type="text"
          >
            Carrito
          </Button>
          <Button
            className="text-white inline-flex items-center"
            icon={<AiFillWallet size={25} />}
            type="text"
          >
            Wallet
          </Button>
          <UserMenu />
        </Space>
      </nav>
    </Header>
  );
}
