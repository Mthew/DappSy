import { Card as CardAnt } from "antd";

export const Card = ({ children, ...props }) => {
  return (
    <CardAnt hoverable {...props}>
      {children}
    </CardAnt>
  );
};
