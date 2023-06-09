import { Empty as EmptyAntd } from "antd";
import { Title } from "./";

const Empty = ({ title }) => {
  return (
    <div className="grid place-items-center h-screen">
      <EmptyAntd description={<Title level={3}>{title}</Title>} />
    </div>
  );
};

export default Empty;
