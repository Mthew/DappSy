import { useContext } from "react";
import { MdSell } from "react-icons/md";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";

import { ProjectOwners } from "./";
import { Button } from "../ui";

//Context
import { ProjectContext } from "../../context";

//utils
import { showPercentage } from "../../utils";

export const ProjectStats = () => {
  const { currentProject } = useContext(ProjectContext);
  return (
    <>
      <ProjectOwners />
      <Button icon={<BsFillGrid1X2Fill size={20} />} type="text">
        {`${currentProject?.tokenCount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Tokens
      </Button>
      <Button icon={<FaMoneyBillWave size={20} />} type="text">
        {`$${currentProject?.tokenCost}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </Button>
      <Button icon={<MdSell size={20} />} type="text">
        {showPercentage(currentProject?.tokenPercentage)} Vendido
      </Button>
    </>
  );
};
