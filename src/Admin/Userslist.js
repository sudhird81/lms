import { Button, Card, notification, Table } from "antd";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { titleContext } from "../App";
import AuthUer from "../Pages/AuthUser";

const Userslist = () => {
  const [loading, setLoading] = useState();
  const { http } = AuthUer();
  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [current, setCurrent] = useState(1);
  const [perPage, setPerPage] = useState();
  const { userlist } = useContext(titleContext);
  useEffect(() => {
    getEmployee(1);
    document.title=userlist;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const [page, setPage] = useState(1);

  const getEmployee = (page) => {
    setLoading(true);
    http.post(`/employeelist?page=${page}`).then((res) => {
      // console.log(res.data.data.data);

      setDataSource(res.data.data.data);
      setTotalPages(res.data.data.total);
      // console.log(res.data.data.per_page)
      setPerPage(res.data.data.per_page);
      setLoading(false);
    });
  };

  // const [page, setPage] = React.useState(1);

  // render={(value, item, index) => (page - 1) * 10 + index}

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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "x",
      render: (index, record) => (
        <>
          <Button type="danger" onClick={() => deleteUser(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const deleteUser = (id) => {
    setLoading(true);
    http
      .post("/deleteuser", { id: id })
      .then((res) => {
        if (res.status === 200) {
          // window.location.reload(false);
          getEmployee(1);
          notification.success({
            description: "User Deleted",
            placement: "topRight",
            top: 50,
          });
        }
      })
      .catch(function (error) {
        if (error.response.request.status === 401) {
          notification.error({
            description: "Session Expired Relogin",
            placement: "topRight",
            top: 50,
          });
        }
        if (error.response.request.status === 403) {
          notification.error({
            description: "User Already Deleted",
            placement: "topRight",
            top: 50,
          });
        }
      });
  };

  return (
    <>

<div className="site-card-border-less-wrapper">
        <Card
          title="All Employees"
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
        // scroll={{ x: 1300 }}
        pagination={{
          pageSize: perPage,
          total: totalPages,
          onChange: (page) => {
            getEmployee(page);
            setCurrent(page);
          },
        }}
      />
      </Card>
      </div>
    </>
  );
};

export default Userslist;
