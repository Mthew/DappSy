import { useState } from "react";
import { Image } from "antd";


const ProjectGallery = ({ imgs }) => {
    const [visible, setVisible] = useState(false);
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