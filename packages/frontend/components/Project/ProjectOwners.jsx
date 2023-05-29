import { useState, useContext, useEffect } from "react";
import NextLink from "next/link";
import { Modal, List, Typography, Card, Avatar } from "antd";
import { MdGroup } from "react-icons/md";
import { FaEye } from "react-icons/fa";

//components
import { Button } from "../ui";

//constants
import { ROUTES, showPercentage } from "../../utils";

//constext
import { ProjectContext } from "../../context";

const { Meta } = Card;

const ProjectOwners = ({}) => {
  const { currentProject } = useContext(ProjectContext);

  const [visible, setVisible] = useState(false);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    if (currentProject) setOwners(currentProject.tokenOwners);
  }, [currentProject]);

  const closeModal = () => setVisible(false);
  return (
    <>
      <Button
        icon={<MdGroup size={20} />}
        type="text"
        onClick={() => setVisible(true)}
      >
        {`${(owners || { length: 0 }).length} Propietarios`}
      </Button>
      <Modal
        title={"Propietarios"}
        open={visible}
        onOk={closeModal}
        onCancel={closeModal}
        cancelButtonProps={{ hidden: true }}
      >
        <List
          dataSource={owners}
          renderItem={(owner, i) => (
            <List.Item
              key={i}
              actions={[
                <NextLink href={`${ROUTES.profile}/${owner.userId}`}>
                  <a>
                    <FaEye />
                  </a>
                </NextLink>,
              ]}
            >
              <Meta
                avatar={
                  <Avatar
                    src={
                      owner.profilePhoto ||
                      "https://xsgames.co/randomusers/avatar.php?g=pixel"
                    }
                  />
                }
                title={owner.name}
                description={`${owner.tokenCount} tokens, ${showPercentage(
                  owner.ownerPercentage
                )} de participación`}
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

export default ProjectOwners;
