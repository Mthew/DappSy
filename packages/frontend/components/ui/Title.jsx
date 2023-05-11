import { Typography } from "antd";

const TitleAnt = Typography.Title;

export const Title = ({ children, ...props }) => {
  return <TitleAnt {...props}>{children}</TitleAnt>;
};
