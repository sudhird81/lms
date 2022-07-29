import { useEffect, useState } from "react";

import AuthUser from "./AuthUser";
import { Card, PageHeader, Space, Spin } from "antd";
import { useContext } from "react";
import { titleContext } from "../App";

function Dashboard() {
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState();
  const { title } = useContext(titleContext);

  useEffect(() => {
    fetchUserDetail();
    document.title = title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchUserDetail = () => {
    http.post("/profile").then((res) => {
      //       console.log(res.data);
      setUserdetail(res.data);
      //sessionStorage.setItem('u_id',userdetail.iduserdetail.id)
    });
  };

  function rednerElement() {
    if (userdetail) {
      /* setting user id in session storage */
      sessionStorage.setItem("u_id", userdetail.id);
      sessionStorage.setItem("u_name", userdetail.name);
      return (
        <>
          <div className="site-card-border-less-wrapper">
            <Card
              title={`Welcome ${
                userdetail.name.charAt(0).toUpperCase() +
                userdetail.name.slice(1)
              } to Profile`}
              bordered={false}
              style={{
                width: 900,
              }}
            >
              <p>
                <b>User ID : </b> {userdetail.id}
              </p>
              <p>
                <b>Name : </b> {userdetail.name}
              </p>
              <p>
                <b>Email : </b> {userdetail.email}
              </p>
            </Card>
          </div>
        </>
      );
    } else {
      return (
        // <div className="site-card-border-less-wrapper">
        //   <Spin />
        // </div>

        <div
          className="site-card-border-less-wrapper"
          style={{
            margin: "20px 20px",
            marginBottom: "20px",
            padding: "30px 50px",
            textAlign: "center",
            borderRadius: "4px",
          }}
        >
          {/* margin: 20px 0;
  margin-bottom: 20px;
  padding: 30px 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px; */}

          <Space align="baseline">
            <Spin size="large" tip="Wait Loading Profile..." />
          </Space>
        </div>
      );
    }
  }
  return <>{rednerElement()}</>;
}

export default Dashboard;
