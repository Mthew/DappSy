import { Button as AntButton } from "antd";

export const Button = ({ children, ...props }) => {
  return (
    <AntButton className="inline-flex items-center" {...props}>
      {children}
    </AntButton>
  );
};
