import { uid } from "uid";
import Link from "next/link";
import {
  AiFillAccountBook,
  AiFillHeart,
  AiFillBuild,
  AiFillProject,
  AiOutlineTransaction,
  AiOutlineUser,
  AiOutlineLogout
} from "react-icons/ai";

const navigation = [ 
  {
    title: "Crear Proyecto",
    icon: <AiFillBuild />,
    to: "/favorites",
  },  
  {
    type: "divider",
  },
  {
    title: "Mis favoritos",
    icon: <AiFillHeart />,
    to: "/favorites",
  },
  {
    title: "Mis Proyectos",
    icon: <AiFillProject />,
    to: "/project",
  },
  {
    title: "Mis Tokens",
    icon: <AiFillAccountBook />,
    to: "/tokens",
  },
  {
    type: "divider",
  },
  {
    title: "Perfil",
    icon: <AiOutlineUser />,
    to: "/profile",
  },
  {
    title: "Transacciones",
    icon: <AiOutlineTransaction />,
    to: "/transacctions",
  },
  {
    type: "divider",
  },
  {
    title: "Cerrar Sesión",
    icon: <AiOutlineLogout />,
    to: "/logout",
  },
];

function createMenuItem({ title, icon, children, type, to }) {  
  return {
    key: uid(8),
    icon,
    children,
    label: to ? <Link href={to}>{title}</Link> : title,
    type,
  };
}

export default navigation.map((item) => createMenuItem(item));
