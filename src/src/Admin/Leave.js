import { useEffect, useState } from "react";
import * as moment from "moment";

import AuthUser from "../Pages/AuthUser";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  notification,
  PageHeader,
  Space,
  Spin,
  Table,
} from "antd";
import { useContext } from "react";
import { titleContext } from "../App";

function Dashboard() {
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState();
  const { approveleave } = useContext(titleContext);
  const isAdmin = sessionStorage.getItem("superUser");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modaldata, setmodaldata] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchUserDetail();
    document.title = approveleave;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchUserDetail = () => {
    setLoading(true);
    http.post("/leavelist").then((res) => {
      setUserdetail(res.data);
      setDataSource(res.data);
      setLoading(false);
    });
  };

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
      title: "Action",
      dataIndex: "id",
      key: "x",
      render: (index, record) => (
        <>
          <Button type="primary" onClick={() => approve(record)}>
            Approve
          </Button>
          <Button type="danger" onClick={() => showModal(record)}>
            Reject
          </Button>
        </>
      ),
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const approve = (id) => {
    http
      .patch("/approveleave", { id: id })
      .then((res) => {
        if (res.status == 200) {
          fetchUserDetail();
          notification.success({
            description: "Leave Approved",
            placement: "topRight",
            top: 50,
          });
        }
      })
      .catch(function (error) {
        if (error.response.request.status === 401) {
          notification.error({
            description: "Session Expired, Relogin",
            placement: "topRight",
            top: 50,
          });
        }
        if (error.response.request.status === 403) {
          notification.error({
            description: "Allready Approved",
            placement: "topRight",
            top: 50,
          });
        }
      });
  };

  const showModal = (record) => {
    setmodaldata(record);
    setIsModalVisible(true);
  };

  const reject = async (values) => {
    const id = values.id;
    const rejectmsg = values.rejectmsg;
    console.log(values);
    await http
      .patch("/rejectleave", { id: id, reject: rejectmsg })
      .then((res) => {
        setIsModalVisible(false);
        if (res.status == 200) {
          fetchUserDetail();
          notification.success({
            description: "Leave Rejected",
            placement: "topRight",
            top: 50,
          });
        }
      })
      .catch(function (error) {
        if (error.response.request.status === 401) {
          notification.error({
            description: "Session Expired, Relogin",
            placement: "topRight",
            top: 50,
          });
        }
        if (error.response.request.status === 403) {
          notification.error({
            description: "Allready Approved Cant Reject Now",
            placement: "topRight",
            top: 50,
          });
        }
      });
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  function rednerElement() {
    if (isAdmin == 1) {
      return (
        <>
          <Table
            loading={loading}
            rowKey="id"
            dataSource={dataSource}
            columns={columns}
           // title={() => "Leave List"}
            bordered
            scroll={{ x: 1100 }}
            pagination={false}
            /* scroll={{
              y: 200,
            }} */
          />

          <Modal
            title="Reject Leave Message"
            destroyOnClose={true}
            visible={isModalVisible}
            onCancel={handleCancel}
            onOk={form.submit}
            okText="Reject"
          >
            <Form
              name="basic"
              form={form}
              initialValues={{
                remember: true,
              }}
              onFinish={(values) => reject(values)}
              autoComplete="off"
            >
              <Form.Item
                hidden
                name="id"
                label="Id"
                initialValue={modaldata.id}
              >
                <Input hidden={true} />
              </Form.Item>
              <Form.Item
                name="rejectmsg"
                label="Reject Message"
                rules={[
                  {
                    required: true,
                    message: "Reject message cant be empty!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </>
      );
    } else {
      if (userdetail) {
        return (
          <>
            {console.log(isAdmin)}
            <PageHeader
              className="site-page-header"
              title={"Welcome " + userdetail.name + " to Profile"}
            />

            <p>
              <b>User ID : </b> {userdetail.id}
            </p>
            <p>
              <b>Name : </b> {userdetail.name}
            </p>
            <p>
              <b>Email : </b> {userdetail.email}
            </p>
          </>
        );
      } else {
        return (
          <div className="space-align-block">
            <Space align="baseline">
              <Spin size="large" tip="Wait Loading Profile..." />
            </Space>
          </div>
        );
      }
    }
  }
  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card
          title="Approve Leave"
          bordered={false}
          style={{
            width: 900,
          }}
        >
          {rednerElement()}
        </Card>
      </div>
    </>
  );
}

export default Dashboard;
