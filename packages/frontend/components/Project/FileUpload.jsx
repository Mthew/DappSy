import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { storage } from "../../utils/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadButton = (
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
const App = ({ onChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [progresspercent, setProgresspercent] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlers = {
    cancel: () => setPreviewOpen(false),
    preview: async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    },
    change: ({ fileList: newFileList }) => {
      setFileList(newFileList);
      onChange(newFileList);
      console.log("FILE-LIST =====> ", fileList);
    },
    submit: (e) => {
      console.log("FILE-LIST =====> ", e);
      handlers.change({ fileList: e.fileList });

      const file = e.file;
      if (!file) return;
      const storageRef = ref(storage, `projects/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
          });
        }
      );
    },
  };

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlers.preview}
        onChange={handlers.submit}
      >
        {fileList.length >= 8 ? null : UploadButton}
      </Upload>
      {/* {JSON.stringify({
        percent: progresspercent,
        imgUrl,
      })} */}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handlers.cancel}
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
