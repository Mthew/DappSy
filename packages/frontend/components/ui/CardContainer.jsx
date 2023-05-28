import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const CardContainer = ({ title, subtitle, children }) => {
  return (
    <Card
      title={
        <>
          <Title level={4}>{title}</Title>
          <Text style={{ whiteSpace: "break-spaces" }}>
            {subtitle}
          </Text>
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
