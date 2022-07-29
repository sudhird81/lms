import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import AuthUser from "../../Pages/AuthUser";

const { Header } = Layout;
const Mainheader = () => {
  const naviagte = useNavigate();
  const { token } = AuthUser();

  const isAdmin = sessionStorage.getItem("superUser");
 
  const logout = () => {
    if (token !== undefined) {
      sessionStorage.clear();
      naviagte("/");
    }
  };

  const onClick = (e) => {
    if (e.key === "Logout") {
      logout();
    }
  };

  const items = [
    {
      label: <Link to="/changepassword"> Update Profile </Link>,
      key: "UpdateProfile",
    },
    {
      label: "Logout",
      key: "Logout",
    },
  ];

  return (
    <>
      <Header
        className="site-layout-background"
        style={{ display: "flex", justifyContent: "space-between"}}
      >
      <div style={{ color: "white",fontSize: 19 }}>
          {isAdmin == 1 ? "Admin Dashboard" : " User Dashboard"}
        </div>

        <Menu
          style={{ width: 250 }}
          onClick={onClick}
          theme="dark"
          mode="horizontal"
          items={items}
        />
      </Header>
    </>
  );
};

export default Mainheader;
