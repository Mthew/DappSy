import { useContext } from "react";
import { AutoComplete, Input } from "antd";
import { AiOutlineSearch } from "react-icons/ai";

//contexts
import { ProjectContext } from "../../context";

export const ProjectSearch = () => {
  const { projects } = useContext(ProjectContext);
  const onSelect = (data) => {
    console.log("onSelect", data);
  };
  const onChange = (data) => {
    console.log("onChange", data);
  };

  return (
    <AutoComplete
      width={"100%"}
      className="flex items-center rounded"
      //   value={value}
      options={projects.map((project) => ({
        value: project.name,
        label: project.name,
      }))}
      style={{ width: 200 }}
      onSelect={onSelect}
      //   onSearch={(text) => setAnotherOptions(getPanelValue(text))}
      onChange={onChange}
      //   placeholder="control mode"
    >
      <Input
        suffix={<AiOutlineSearch />}
        width={"100%"}
        className="flex items-center rounded"
      />
    </AutoComplete>
  );
};
