/* eslint-disable no-sequences */
import React from "react";
import Login from "./Pages/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AuthUser from "./Pages/AuthUser";
import Logout from "./Pages/Logout";
import Changepassword from "./Pages/Changepassword";
import "antd/dist/antd.css";
import { Col, Layout, Row } from "antd";
import Mainheader from "./component/common/Mainheader";
import { useState } from "react";
import Sidebar from "./component/common/Sidebar";
import { Content } from "antd/lib/layout/layout";
import MainFooter from "./component/common/MainFooter";
import Applyleave from "./Pages/Applyleave";
import Leavestatus from "./Pages/Leavestatus";
import Leave from "./Admin/Leave";
import Addemployee from "./Admin/Addemployee";
import Userslist from "./Admin/Userslist";
import Docs from "./Pages/Docs";
import Listdocs from "./Admin/Listdocs";
import Mydocs from "./Pages/Mydocs";
import Holiday from "./Admin/Holiday";

export const titleContext = React.createContext();

function App() {
  const { getToken } = AuthUser();

  const userEmail = sessionStorage.getItem("user");
  const globalEmail = JSON.parse(userEmail);

  /* Titles for all pages */
  const [title] = useState("Welcome to Dashboard");
  const [logintitle] = useState("Login Here");
  const [changepass] = useState("Change Pass Here");
  const [uploaddocs] = useState("Upload documents here");
  const [applyleave] = useState("Apply Leave");
  const [leavestatus] = useState("Leave Status");
  const [approveleave] = useState("Approve Leaves");
  const [addemp] = useState("Add new Employee");
  const [userlist] = useState("All Users");
  const username = sessionStorage.getItem('u_name');

  /* End Titles for all pages */

  if (!getToken()) {
    return (
      <>
        <Layout>
          <Layout className="site-layout">
            {/*   <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}> */}
            <Row
              type="flex"
              justify="center"
              align="middle"
              style={{ minHeight: "100vh" }}
            >
              <Col
                span={6}
                style={{
                  padding: 25,
                  backgroundColor: "lightblue",
                }}
              >
                <titleContext.Provider value={{ logintitle }}>
                  <Routes>
                    <Route path="/" element={<Login />} />
                  </Routes>
                </titleContext.Provider>
              </Col>
            </Row>
          </Layout>
        </Layout>
      </>
    );
  }
 
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        

        <Layout className="site-layout">
          <Mainheader
            className="site-layout-sub-header-background"
          />
          <Layout
           style={{flexDirection: 'initial'}}
          ><Sidebar />
            <Content
           className="site-layout-background"
           style={{
             padding: 24,
             background: '#dfe4ea',
           }}
            >
              <Row gutter={16}>
                <Col>
                  <titleContext.Provider
                    value={{
                      title: title,
                      changep: changepass,
                      globalEmail: globalEmail,
                      uploaddocs: uploaddocs,
                      applyleave: applyleave,
                      leavestatus: leavestatus,
                      approveleave: approveleave,
                      addemp: addemp,
                      userlist: userlist,
                      username:username,
                    }}
                  >
                    <Routes>
                      <Route
                        path="/dashboard"
                        element={<Dashboard title="Welcome to Dashboard" />}
                      />
                      <Route
                        path="/changepassword"
                        element={<Changepassword title="Change Password" />}
                      />
                      <Route
                        path="/applyleave"
                        element={<Applyleave title="Apply Leave" />}
                      />
                      <Route
                        path="/leavestatus"
                        element={<Leavestatus title="Leave Leave" />}
                      />

                      <Route
                        path="/addemployee"
                        element={<Addemployee title="Leave Leave" />}
                      />

                      <Route path="/docsupload" element={<Docs />} />
                      <Route path="/approveleave" element={<Leave />} />
                      <Route path="/employees" element={<Userslist />} />
                      <Route path="/userdocs" element={<Listdocs />} />
                      <Route path="/holiday" element={<Holiday />} />
                      <Route path="/docs" element={<Mydocs />} />
                      <Route path="/logout" element={<Logout />} />
                    </Routes>
                  </titleContext.Provider>
                </Col>
              </Row>
            </Content>
           
          </Layout> <MainFooter />
        </Layout>
      </Layout>
    </>
  );
}

export default App;
