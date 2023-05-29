import { useState } from "react";
import { Row, Col, Modal, List, Typography } from "antd";
import { FaFile, FaDownload } from "react-icons/fa";

import { Button } from "../ui";

const { Text } = Typography;

const ProjectFilesPreview = ({ files }) => {
  const [visible, setVisible] = useState(false);
  const closeModal = () => setVisible(false);
  return (
    <>
      <Row justify="end">
        <Col>
          <Button
            type="default"
            icon={<FaFile />}
            onClick={() => setVisible(true)}
          >
            Ver documentos
          </Button>
        </Col>
      </Row>
      <Modal
        title="Documentos"
        open={visible}
        onCancel={closeModal}
        onOk={closeModal}
        cancelButtonProps={{ hidden: true }}
      >
        <List
          style={{ margin: "10px 0px" }}
          dataSource={files}
          renderItem={(file, i) => (
            <List.Item
              key={i}
              actions={[
                <a href={file} target="_blank">
                  <FaDownload />
                </a>,
              ]}
            >
              <a href={file} target="_blank">
                <Text>{`Documeto #${i + 1}`}</Text>
              </a>
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

export default ProjectFilesPreview;
