import { Typography } from "antd";

const TitleAnt = Typography.Title;

export const Title = ({ children, color = "black", ...props }) => {
  return (
    <TitleAnt style={{ color }} {...props}>
      {children}
    </TitleAnt>
  );
};
