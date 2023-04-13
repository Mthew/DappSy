import { Card, Typography } from "antd";

const { Title } = Typography;

const CardContainer = ({ title, subtitle, children }) => {
  return (
    <Card
      title={
        <>
          <Title level={4}>{title}</Title>
          <p level={5}>{subtitle}</p>
        </>
      }
      bordered={false}
      hoverable
      className="dappsy-card-container"
    >
      {children}
    </Card>
  );
};

export default CardContainer;