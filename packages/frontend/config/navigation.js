import Link from "next/link";
import { uid } from "uid";
import {
  AiFillAccountBook,
  AiFillHeart,
  AiFillBuild,
  AiFillProject,
  AiOutlineTransaction,
  AiOutlineUser,
  AiOutlineLogout,
  AiFillHome,
} from "react-icons/ai";
import { ROUTES } from "../utils";

const navigation = [
  {
    title: "Home",
    icon: <AiFillHome />,
    to: ROUTES.home,
  },
  {
    title: "Crear Proyecto",
    icon: <AiFillBuild />,
    to: ROUTES.newProject,
  },
  {
    type: "divider",
  },
  {
    title: "Mis favoritos",
    icon: <AiFillHeart />,
    to: ROUTES.favorites,
  },
  {
    title: "Mis Proyectos",
    icon: <AiFillProject />,
    to: ROUTES.myProjects,
  },
  {
    title: "Mis Tokens",
    icon: <AiFillAccountBook />,
    to: ROUTES.tokens,
  },
  {
    type: "divider",
  },
  {
    title: "Perfil",
    icon: <AiOutlineUser />,
    to: ROUTES.profile,
  },
  {
    title: "Transacciones",
    icon: <AiOutlineTransaction />,
    to: ROUTES.transactions,
  },
  {
    type: "divider",
  },
  {
    title: "Cerrar Sesión",
    icon: <AiOutlineLogout />,
    to: ROUTES.logout,
  },
];

function createMenuItem({ title, icon, children, type, to }) {
  return {
    key: uid(8),
    icon,
    children,
    label: to ? (
      <Link href={to} passHref>
        <a href={to}>{title}</a>
      </Link>
    ) : (
      title
    ),
    type,
  };
}

export default navigation.map((item) => createMenuItem(item));
