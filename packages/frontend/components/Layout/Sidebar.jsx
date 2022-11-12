import Link from "next/link";
import Logo from "./Logo";
import styles from "./sidebar.module.css";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Crear Proyecto", href: "/project/new" },
  { name: "Mis Favoritos", href: "/favorites" },
  { name: "Mis Proyectos", href: "/project" },
  { name: "Mis Tokens", href: "/tokens" },
  { component: <hr /> },
  { name: "Perfil", href: "/profile" },
  { name: "Mis Transacciones", href: "/transacctions" },
];

export default function Sidebar() {
  return (
    <nav className={styles.nav}>
      <Logo className="my-3" />
      {/* <input className={styles.input} placeholder="Search..." /> */}
      {navigation &&
        navigation.map((item) =>
          item.separator ? (
            <hr />
          ) : (
            item.href && (
              <Link href={item.href}>
                <a>{item.name}</a>
              </Link>
            )
          )
        )}
    </nav>
  );
}
