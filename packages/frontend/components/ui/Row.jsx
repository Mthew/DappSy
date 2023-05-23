import { Row as RowAnt } from "antd";

export const Row = ({ children, ...props }) => {
  return (
    <RowAnt gutter={[16, 16]} {...props}>
      {children}
    </RowAnt>
  );
};