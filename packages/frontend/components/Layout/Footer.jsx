import { Layout } from "antd";

const { Footer } = Layout;
export const CustomFooter = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      Tecnologico de Antioquia ©2023 Created by M_THEW
      <br />
      v1.0.7
    </Footer>
  );
};

export default CustomFooter;
