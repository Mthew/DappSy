import React, { useEffect } from "react";
import { Col, Row, Form, InputNumber } from "antd";
import { FaDollarSign } from "react-icons/fa";

//Components
import { Button } from "../ui";

import { useTranferTokens } from "../../context";

//Utils
import { showError } from "../../utils";

const ProjectBuyTopkensForm = ({ projectKey, tokenCost }) => {
  const { mint, setTokensToSell } = useTranferTokens({ projectKey });

  const [form] = Form.useForm();
  const tokenCount = Form.useWatch("tokenCount", form);

  useEffect(() => {
    if (tokenCount && tokenCost)
      form.setFieldsValue({ tokenCost: tokenCount * tokenCost });
  }, [tokenCount, tokenCost]);

  const handlers = {
    async buyTokens(values) {
      const { tokenCount } = values;

      if ([0, null, undefined].indexOf(tokenCount) >= 0) {
        return showError("Debe seleccionar la cantidad de tokens");
      }

      setTokensToSell(tokenCount);
      await mint();
    },
  };

  return (
    <Form layout="vertical" form={form} onFinish={handlers.buyTokens}>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item label="Cantidad de tokens" name="tokenCount">
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
