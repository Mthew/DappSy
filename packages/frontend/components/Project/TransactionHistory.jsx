import { useContext } from "react";
import NextLink from "next/link";
import { Table, Card, Avatar } from "antd";
import { FaEthereum } from "react-icons/fa";
import { GiNewBorn } from "react-icons/gi";
import { FcBullish } from "react-icons/fc";

//context
import { ProjectContext } from "../../context";

//utils
import { TRANSACTION_TYPE, showPrice, showQuantity } from "../../utils";

const { Meta } = Card;

const columns = [
  {
    title: "Fecha",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Tipo de Transacción",
    dataIndex: "status",
    key: "status",
    render: (text) => {
      switch (text) {
        case TRANSACTION_TYPE.sell:
          return (
            <div className="inline-flex items-center">
              <GiNewBorn color="green" /> CREACIÓN
            </div>
          );
        default:
          return (
            <div className="inline-flex items-center">
              <FcBullish color="green" /> VENTA
            </div>
          );
      }
    },
  },
  {
    title: "Cantidad de tokens",
    dataIndex: "tokenCount",
    key: "tokenCount",
    render: (text) => (
      <div className="inline-flex items-center">
        <FaEthereum /> {showQuantity(text)}
      </div>
    ),
  },
  {
    title: "Costo",
    dataIndex: "tokenCost",
    key: "tokenCost",
    render: (text) => (
      <div className="inline-flex items-center">{showPrice(text)}</div>
    ),
  },
  {
    title: "Usuario",
    dataIndex: "user",
    key: "user",
    render: (text, record) => (
      <NextLink href={`/profile/${record.user.id}`}>
        <Meta
          title={record.user.name}
          avatar={
            <Avatar
              src={
                record.user.profilePhoto ||
                "https://xsgames.co/randomusers/avatar.php?g=pixel"
              }
            />
          }
        />
      </NextLink>
    ),
  },
];

export const TransactionHistory = () => {
  const { currentProject } = useContext(ProjectContext);

  return <Table dataSource={currentProject?.transactions} columns={columns} />;
};
