import { Card, Table } from "antd";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { titleContext } from "../App";
import AuthUser from "./AuthUser";

const Mydocs = () => {
  const { http } = AuthUser();
  const uid = sessionStorage.getItem("u_id");
  const [loading, setLoading] = useState();
  const [perPage, setPerPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [current, setCurrent] = useState(1);

  const { username } = useContext(titleContext);

  useEffect(() => {
    myDocs(1);
  }, []);

  const myDocs = (page) => {
    setLoading(true);
    http.post(`/userdocs?page=${page}`, { user_id: uid }).then((res) => {
      //console.log(res.status);
      if (res.status === 200) {
        //console.log(res.data.data.total);
        setDataSource(res.data.data.data);
        setPerPage(res.data.data.per_page);
        setTotalPages(res.data.data.total);
        setLoading(false);
      }
    });
  };
  const columns = [
    {
      title: "Serial No",
      key: "index",
      width: 20,
      render: (text, record, index) => (current - 1) * perPage + index + 1,
      //render: (value, item, index) => (current - 1) * 2 + index,
    },
    {
      title: "Name",
      dataIndex: "user_id",
      render: () => username,
    },
    {
      title: "Filename",
      dataIndex: "filename",
    },
    {
      title: "Action",
      dataIndex: "filename",
      render: (filename) => (
        <a
          href={`http://localhost:8000/assets/docs/${filename}`}
          target="__blank"
        >
        
          Download
        </a>
      ),
    },
  ];
  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card
          title="Yours Documents"
          bordered={false}
          style={{
            width: 900,
          }}
        >
          <Table
            loading={loading}
            rowKey="id"
            dataSource={dataSource}
            columns={columns}
            scroll={{ x: 1000 }}
            pagination={{
              pageSize: perPage,
              total: totalPages,
              onChange: (page) => {
                myDocs(page);
                setCurrent(page);
              },
            }}
          />
        </Card>
      </div>
    </>
  );
};

export default Mydocs;
