import React, { useEffect } from "react";
//import * as moment from "moment";
import moment from "moment";

import { Table, Badge, Calendar, Card } from "antd";
import AuthUser from "./AuthUser";
import { useState } from "react";
import { useContext } from "react";
import { titleContext } from "../App";

const Leavestatus = () => {
  const { http } = AuthUser();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const { leavestatus } = useContext(titleContext);

  useEffect(() => {
    document.title = leavestatus;
    fetchLeaveStatus();
  }, []);

  /* Fecthing leave record from backend */
  const fetchLeaveStatus = () => {
    setLoading(true);
    http.post("/leavestatus").then((res) => {
      setDataSource(res.data);
      setLoading(false);
    });
  };

  /* Calender Events */
  const dateCellRender = (value) => {
    const stringValue = value.format("yyyy-MM-DD");

    const listData = dataSource.filter(
      ({ from_date }) => from_date === stringValue
    );
     console.log(dataSource);
    return (
      <>
        {listData.map((item) => (
          
          <ul className="events">
            <Badge status={"success"} text={item.type} />
            <Badge status={"success"}  text={ item.status === 0 ? "Approved":item.status === 1 ? "Pending" : "Rejected"} />
            </ul>
         

        ))}
       </>
    );
  };
  /* End Calender Events */

  const columns = [
    {
      title: "Serial No",
      key: "index",
      width: 20,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Email",
      dataIndex: "user_email",
      width: 50,
    },
    {
      title: "Leave Type",
      dataIndex: "type",
      width: 20,
    },
    {
      title: "Reason",
      dataIndex: "description",
    },
    {
      title: "Leave From",
      dataIndex: "from_date",
      render: (from_date) => {
        return <>{moment(from_date).format("DD MMM YYYY")}</>;
      },
    },
    {
      title: "Leave To",
      dataIndex: "to_date",
      render: (to_date) => {
        return <>{moment(to_date).format("DD MMM YYYY")}</>;
      },
    },
    {
      title: "Leave Applied",
      dataIndex: "created_at",
      render: (created_at) => {
        return <>{moment(created_at).format("DD MMM YYYY")}</>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        return (
          <>
            {status === 0 ? "Approved" : status === 1 ? "Pending" : "Rejected"}
          </>
        );
      },
    },
    {
      title: "Rejected Message",
      dataIndex: "rejected_msg",
    },
  ];

  return (
    <>
      {/* <div
        style={{
          display: "block",
          width: 1000,
          padding: 20,
        }}
      > */}
        
        <div className="site-card-border-less-wrapper">
        <Card
          title="Leave Status"
          bordered={false}
          style={{
            width: 1100,
          }}
        >
        <Table
          loading={loading}
          rowKey="id"
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: 1300 }}
          pagination={false}
        /><br /><Calendar validRange={[ moment('2022-07-22', 'yyyy-MM-DD'),  moment('2022-07-25', 'yyyy-MM-DD')]} dateCellRender={dateCellRender}  />
        </Card>
        </div>
      {/* </div>
      ; */}
    </>
  );
};

export default Leavestatus;
