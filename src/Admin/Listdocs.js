import React from "react";
import { useEffect } from "react";
import AuthUser from "../Pages/AuthUser";
import { Card, Table } from "antd";
import { useState } from "react";

const Listdocs = () => {
  const [loading, setLoading] = useState();
  const { http } = AuthUser();
  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [perPage, setPerPage] = useState();
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    getdoclist(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getdoclist = (page) => {
    setLoading(true);
    http.post(`/admingetdocs?page=${page}`).then((res) => {
      console.log(res.data.data.total);
      setDataSource(res.data.data.data);
      setTotalPages(res.data.data.total);
      setPerPage(res.data.data.per_page);
      setLoading(false);
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
      dataIndex: "name",
    },
    {
      title: "Filename",
      dataIndex: "filename",
    },
    {
        title: "Action",
        dataIndex: "filename",
        render:  (filename) => <a  href={`http://localhost:8000/assets/docs/${filename}`} target="__blank"> Download</a>
      },
  ];

  return (
    <>
    <div className="site-card-border-less-wrapper">
    <Card
      title="Users Docs List"
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
            getdoclist(page);
            setCurrent(page);
          },
        }}
      /></Card>
      </div>
    </>
  );
};

export default Listdocs;
