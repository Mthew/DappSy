import React, { useContext, useEffect } from "react";
import { Col, Row, Form, InputNumber } from "antd";
import { FaDollarSign } from "react-icons/fa";

//Components
import { Button } from "../ui";

//Contexts
import { ProfileContext, SignerContext } from "../../context";

//Utils
import { showError } from "../../utils";

const ProjectBuyTopkensForm = ({ projectId, tokenCost }) => {
  const { buyTokens } = useContext(ProfileContext);
  const { showSignMessage } = useContext(SignerContext);

  const [form] = Form.useForm();
  const tokenCount = Form.useWatch("tokenCount", form);

  useEffect(() => {
    if (tokenCount && tokenCost)
      form.setFieldsValue({ tokenCost: tokenCount * tokenCost });
  }, [tokenCount, tokenCost]);

  const handlers = {
    buyTokens(values) {
      const { tokenCount } = values;
      console.log("values", values);
      if ([0, null, undefined].indexOf(tokenCount) >= 0)
        return showError("Debe seleccionar una cantidad de tokens");

      showSignMessage(
        `¿Desea comprar ${tokenCount} tokens, por un total de $${String(
          values.tokenCost
        ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} usd?`,
        async () => {
          await buyTokens(projectId, tokenCount);
        }
      );
    },
  };

  return (
    <Form layout="vertical" form={form} onFinish={handlers.buyTokens}>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item label="Cantidad de tokens" name="tokenCount">
            <InputNumber
              style={{ width: "100%" }}
              min={1}
              //   {...(project.maxTokenByuser
              //     ? { max: project.maxTokenByuser }
              //     : {})}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item label="Costo total" name="tokenCost">
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              disabled
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button htmlType="submit" type="primary" icon={<FaDollarSign />}>
            Comprar tokens
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ProjectBuyTopkensForm;
