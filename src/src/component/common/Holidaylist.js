import { Card, Table } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { titleContext } from "../../App";
import AuthUser from "../../Pages/AuthUser";

const Holidaylist = () => {
  const { http } = AuthUser();
  const [loading, setLoading] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [isAdmin] = sessionStorage.getItem("superUser");

  console.log(isAdmin);

  useEffect(() => {
    getholidatlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getholidatlist = () => {
    setLoading(true);
    http.post("/holidaylist").then((res) => {
      console.log(res);
      if (res) {
        setLoading(false);
        setDataSource(res.data.data.data);
      }
    });
  };

  function renderData() {
    if (isAdmin == 1) {
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
              />
            </Card>
          </div>
        </>
      );
    } else {
      return <>User Holiday List</>;
    }
  }

  return (
    <>
      <h1>Holidaylist</h1>
      {renderData()}
    </>
  );
};

export default Holidaylist;
