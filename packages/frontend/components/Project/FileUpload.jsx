import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
// import { storage } from "../../ ";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const App = ({ onChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://sites.google.com/site/creacionweb0002/_/rsrc/1488966382529/escrituras/342px-Escritura_Constitucion_Sociedad_Aces_01.jpg',
    // },
    // {
    //   uid: '-2',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://assets-global.website-files.com/5c4ba48132b5c62df3e9c1b4/5d2cca67a0329a460df71a43_Escritura%20Publica%20de%20bienes%20ra%C3%ADces%20(2)-01.jpg',
    // },
    // {
    //   uid: '-3',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'http://blog.hallocasa.com/wp-content/uploads/2017/02/escritura-mexico.jpg',
    // },
    // {
    //   uid: '-4',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlPLMZ2YmwMzpaloha5TokBOGTpzmpfe1YlTewP3JR60NR9xK60vuj0O7o_NGUaJCuoTw&usqp=CAU',
    // },
    // {
    //   uid: '-xxx',
    //   percent: 50,
    //   name: 'image.png',
    //   status: 'uploading',
    //   url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvlzc570MQUREVyblmqLF5PToffCvhZA4y9V4qdM2c_5AcIKoUeHH1gW3KWig9JI1dmXs&usqp=CAU',
    // },
  ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onChange(newFileList);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Upload
        action="/api/helpers/file"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default App;
