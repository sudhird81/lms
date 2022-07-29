import { Button, Card, notification, Table } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import AuthUser from "../../Pages/AuthUser";
import * as moment from "moment";
import "../../App.css"

const Holidaylist = () => {

  const { http } = AuthUser();
  const [loading, setLoading] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [isAdmin] = sessionStorage.getItem("superUser");
  const [perPage, setPerPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [current, setCurrent] = useState(1);
  const date = new Date();
  const currDate = moment(date).format("y-MM-D");
  useEffect(() => {
    getholidaylist(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getholidaylist = (page) => {
    setLoading(true);
    http.post(`/holidaylist?page=${page}`).then((res) => {
      console.log(res.data.data.data);
      if (res) {
        setDataSource(res.data.data.data);
        setPerPage(res.data.data.per_page);
        setTotalPages(res.data.data.total);
        setLoading(false);
      }
    });
  };
  const deleteHoliday = (record) => {
    http
      .post("/deleteholiday", { id: record.id })
      .then((res) => {
        if (res.status === 200) {
          getholidaylist(1);
          notification.success({
            description: "Holiday Deleted",
            placement: "topRight",
            top: 50,
          });
        }
      })
      .catch(function (error) {
        if (error.response.request.status === 401) {
          notification.error({
            description: "Session Expired",
            placement: "topRight",
            top: 50,
          });
        }
        if (error.response.request.status === 403) {
          notification.error({
            description: "Holiday Deleted Already",
            placement: "topRight",
            top: 50,
          });
        }
      });
  };

  const columns = [
    {
      title: "#",
      key: "index",
      width: 20,
      render: (text, record, index) => (current - 1) * perPage + index + 1,
    },
    {
      title: "Holiday",
      dataIndex: "holiday",
    },
    // {
    //   title: "From",
    //   dataIndex: "from",
    //   render(from) {
    //     return {
    //       props: {
    //         style: { background: from < currDate ? "#e17055" : "" },
    //       },
    //       children: <>{moment(from).format("DD MMM YYYY")}</>,
    //     };
    //   },
    // },
    {
      title: "From",
      dataIndex: "from",
      render: (from) => {
        return <>{moment(from).format("DD MMM YYYY")}</>;
      },
    },
    {
      title: "To",
      dataIndex: "to",
      render: (to) => {
        return <>{moment(to).format("DD MMM YYYY")}</>;
      },
    },
    // {
    //   title: "To",
    //   dataIndex: "to",
    //   // render: (to) => {
    //   //   return <>{moment(to).format("DD MMM YYYY")}</>;
    //   // },
    //   render(to, record) {
    //     return {
    //       props: {
    //         style: { background: to < currDate ? "#e17055" : "" },
    //       },
    //       children: <>{moment(to).format("DD MMM YYYY")}</>,
    //     };
    //   },
    // },

    isAdmin == 1
      ? {
          title: "Action",
          dataIndex: "id",
          key: "x",
          render: (index, record) => (
            <>
              <Button type="danger" onClick={() => deleteHoliday(record)}>
                Delete
              </Button>
            </>
          ),
        }
      : {},
  ];

  function renderData() {
    if (isAdmin == 1) {
      return (
        <>
          <Table
            loading={loading}
            rowKey="id"
            dataSource={dataSource}
            columns={columns}
            rowClassName={(record, i) => (record.to < currDate ? 'red' : '')}
            pagination={{
              pageSize: perPage,
              total: totalPages,
              onChange: (page) => {
                getholidaylist(page);
                setCurrent(page);
              },
            }}
          />
        </>
      );
    } else {
      return (
        <>
          <Table
            loading={loading}
            rowKey="id"
            dataSource={dataSource}
            columns={columns}
            // scroll={{ x: 1300 }}
          />
        </>
      );
    }
  }

  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card
          title={`Upcoming Holidays ${new Date().getFullYear()}`}
          bordered={false}
          style={{
            width: 900,
          }}
        >
          {renderData()}
        </Card>
      </div>
    </>
  );
};

export default Holidaylist;
