import React, { useState, useEffect } from "react";
import { Upload, message, DatePicker, Modal, Radio } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { postFromData } from "../../../axios";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

function UploadImage({ inv }) {
  const [invoice, setInvoice] = useState(inv);
  const [stateVal, setStateVal] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [
     
    ],
  });

  useEffect(() => {
    setInvoice(inv);
  }, [inv]);

  const handleCancel = () =>  setStateVal({ ...stateVal ,previewVisible: false });

  const handlePreview = async (file) => {

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateVal({
      ...stateVal,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });

  };



  const handleChange = async ({fileList,file}) => {
    // console.log(JSON.stringify(fileList));
  
    setStateVal({ fileList });

    // var bodyFormData = new FormData();
    // bodyFormData.append('file', file.originFileObj);
    // bodyFormData.append('type', 'invoice');
    // bodyFormData.append('ref', 'INV00010');

    // const result = await  postFromData('/image/add',bodyFormData);

  
  }

  const handleRemove = (file) => {
    // console.log(file);
  }

  const uploadImageToStorage = async (file) => {
    var bodyFormData = new FormData();
    bodyFormData.append('file', file);
    bodyFormData.append('type', 'invoice');
    bodyFormData.append('ref', 'INV00010');

    const result = await  postFromData('/image/add',bodyFormData);
  }

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={stateVal.fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        action={"http://localhost:5000/api/image/add"}
        onRemove={handleRemove}
        style={{width:"500px" }}
      >
        {stateVal.fileList.length >= 3 ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>อัพโหลด</div>
          </div>
        )}
      </Upload>
      <Modal
        visible={stateVal.previewVisible}
        title={stateVal.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={stateVal.previewImage}
        />
      </Modal>

    </>
  );
}

export default UploadImage;
