import { useContext } from "react";

//componenets
import { Layout } from "../../components/Layout";
import { Empty } from "../../components/ui";

//Context
import { ProfileContext } from "../../context";

const UserTransactions = () => {
  const { profile = {} } = useContext(ProfileContext);

  if (profile == null) {
    return <>Inicie session para ver esta pantalla</>;
  }

  if (profile?.transactions == null) {
    return <Empty title="No hay transacciones" />;
  }

  return <h1>Hostoprial de transacsiones</h1>;
};

UserTransactions.getLayout = (page) => (
  <Layout title={"Historial de transacciones"}>{page}</Layout>
);

export default UserTransactions;
