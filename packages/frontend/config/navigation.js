import Link from "next/link";
import {
  AiFillAccountBook,
  AiFillHeart,
  AiFillHome,
  AiFillProject,
  AiOutlineTransaction,
  AiOutlineUser,
} from "react-icons/ai";

const navigation = [
  {
    label: "Home",
    icon: <AiFillHome />,
    to: "/",
  },
  {
    label: "Mis favoritos",
    icon: <AiFillHeart />,
    to: "/favorites",
  },
  {
    label: "Mis Proyectos",
    icon: <AiFillProject />,
    to: "/favorites",
  },
  {
    label: "Mis Tokens",
    icon: <AiFillAccountBook />,
    to: "/favorites",
  },
  {
    type: "divider",
  },
  {
    label: "Perfil",
    icon: <AiOutlineUser />,
    to: "/favorites",
  },
  {
    label: "Transacciones",
    icon: <AiOutlineTransaction />,
    to: "/favorites",
  },
];

export default navigation;
export function createMenuItem({ label, key, icon, children, type, to }) {
  if (to) {
    children = <Link href={to}>{label}</Link>;
  }
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
