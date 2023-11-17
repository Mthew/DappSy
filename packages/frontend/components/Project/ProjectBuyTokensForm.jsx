import React, { useEffect, useContext } from "react";
import { Col, Row, Form, InputNumber } from "antd";
import { FaDollarSign } from "react-icons/fa";

//Components
import { Button } from "../ui";

import { ProfileContext, useTranferTokens } from "../../context";

//Utils
import { showError } from "../../utils";

const ProjectBuyTopkensForm = ({ projectId, projectKey, tokenCost }) => {
  const { validateProfileConfirmed } = useContext(ProfileContext);

  const { mint, setTokensToSell, setTokenCost } = useTranferTokens({
    projectKey,
  });

  const [form] = Form.useForm();
  const tokenCount = Form.useWatch("tokenCount", form);

  useEffect(() => {
    if (tokenCount && tokenCost)
      form.setFieldsValue({ tokenCost: tokenCount * tokenCost });
  }, [tokenCount, tokenCost]);

  const handlers = {
    async buyTokens(values) {
      if (!validateProfileConfirmed()) {
        return;
      }

      const { tokenCount, tokenCost } = values;

      if ([0, null, undefined].indexOf(tokenCount) >= 0) {
        return showError("Debe seleccionar la cantidad de tokens");
      }

      setTokensToSell(tokenCount);
      setTokenCost(tokenCost);
      await mint(projectId);
    },
  };

  return (
    <Form layout="vertical" form={form} onFinish={handlers.buyTokens}>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label="Cantidad de tokens"
            name="tokenCount"
            rules={[
              {
                required: true,
                message: "¡La Cantidad de tokens es requerida!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} min={1} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item label="Costo total" name="tokenCost">
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              prefix="ETH"
              formatter={(value) =>
                ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
