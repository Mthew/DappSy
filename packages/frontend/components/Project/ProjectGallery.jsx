import { useState } from "react";
import { Image } from "antd";

const ProjectGallery = ({ imgs }) => {
  const [visible, setVisible] = useState(false);
  if (imgs == null) {
    return <>El proyecto no tiene imagenes asociadas</>;
  }
  return (
    <>
      <Image
        preview={{
          visible: false,
        }}
        src={imgs[0]}
        onClick={() => setVisible(true)}
      />
      <div
        style={{
          display: "none",
        }}
      >
        <Image.PreviewGroup
          preview={{
            visible,
            onVisibleChange: (vis) => setVisible(vis),
          }}
        >
          {imgs.map((img, i) => (
            <Image key={i} src={img} />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default ProjectGallery;
