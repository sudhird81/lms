import React from "react";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, notification, Card } from "antd";

import AuthUser from "./AuthUser";
import { useContext } from "react";
import { titleContext } from "../App";
import { useEffect } from "react";

function Docs() {
  const { http } = AuthUser();
  const { uploaddocs } = useContext(titleContext);
  useEffect(() => {
    document.title = uploaddocs;
  });

  const user_id = sessionStorage.getItem("u_id");

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const submitHandle = () => {
    const formData = new FormData();
    formData.append("file", fileList[0]);
    formData.append("id", user_id);
    console.log(fileList[0].type);




    if (fileList[0].type === "application/pdf" || fileList[0].type==="application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setUploading(true);
      http
        .post("/uploadfiles", formData)
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            notification.success({
              description: "File Uploaded Succesfully",
              placement: "topRight",
              top: 50,
            });
          }

          setFileList([]);
        })
        .catch(function (error) {
          console.log(error.response.request.status);
          if (error.response.request.status === 401) {
            notification.error({
              description: "Session Expired, Relogin",
              placement: "topRight",
              top: 50,
            });
          }
          if (error.response.request.status === 403) {
            notification.error({
              description: "Image not attached",
              placement: "topRight",
              top: 50,
            });
          }
        })
        .finally(() => {
          setUploading(false);
        });
    } else {
      notification.error({
        description: "Only pdf files allowed",
        placement: "topRight",
        top: 50,
      });
      setFileList([]);
    }
    // app.post('/upload', (req, res) => {
    //   if (req.files === null) {
    //   return res.status(400).json({ msg: 'No file uploaded' });
    //   }

    //   const file = req.files.file;

    //   file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    //     if (err) {
    //       console.error(err);
    //       return res.status(500).send(err);
    //     }

    //     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    //   });
    // });
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card
          title="Upload Documents"
          bordered={false}
          style={{
            width: 900,
          }}
        >
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        //accept=".pdf"
        onClick={submitHandle}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? "Uploading" : "Upload"}
      </Button>
     </Card>
     </div>
    </>
  );
}

export default Docs;
