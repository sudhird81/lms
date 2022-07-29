import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const Sidebar = () => {
  const isAdmin = sessionStorage.getItem("superUser");

  console.log(isAdmin);
  const adminItem = [
    {
      label: <Link to="/dashboard">Dashboard</Link>,
      key: "dashboard",
    },
    {
      label: <Link to="/approveleave">Approve Leave</Link>,
      key: "approveleave",
    },

    {
      label: <Link to="/userdocs">Users Docs</Link>,
      key: "userdocs",
    },
    {
      label: <Link to="/holiday">Holidays</Link>,
      key: "holidays",
    },
    {
      label: "Employees",
      key: "employees",
      children: [
        {
          label: <Link to="/addemployee">Add Employee</Link>,
          key: "addemployee",
        },
        {
          label: <Link to="/employees">Employee List</Link>,
          key: "employeelist",
        },
      ],
    },
  ];

  const userItem = [
    {
      label: <Link to="/dashboard">Dashboard</Link>,
      key: "user dashboard",
    },

    {
      label: "Leaves",
      key: "leave",
      children: [
        {
          label: <Link to="/applyleave">Apply Leave</Link>,
          key: "applyleave",
        },
        {
          label: <Link to="/leavestatus">Leave Status</Link>,
          key: "leaevstatus",
        },
      ],
    },
    {
      label: "My Docs",
      key: "mydocs",
      children: [
        {
          label: <Link to="/docsupload">Upload Docs</Link>,
          key: "docsupload",
        },
        {
          label: <Link to="/docs">My Docs</Link>,
          key: "mydocs2",
        },
      ],
    },
  ];

  function renderElement() {
    if (isAdmin == 1) {
      return (
        <>
          <Menu
            theme="dark"
            mode="vertical"
            defaultSelectedKeys={["1"]}
            items={adminItem}
          ></Menu>
        </>
      );
    } else {
      return (
        <>
          <Menu
            theme="dark"
            mode="vertical"
            defaultSelectedKeys={["1"]}
            items={userItem}
          ></Menu>
        </>
      );
    }
  }

  return (
    <>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        {renderElement()}
      </Sider>
    </>
  );
};

export default Sidebar;
