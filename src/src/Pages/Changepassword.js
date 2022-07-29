import React, { useContext, useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import { Layout, Row, Col, Card } from "antd";
import { Button, notification, Form, Input } from "antd";

import { titleContext } from "../App";
import { useForm } from "antd/lib/form/Form";
const { Content } = Layout;

const Changepassword = () => {
  const [loadings, setLoadings] = useState([]);
  //const [btndisabled, setBtndisabled] = useState(true);

  const { http } = AuthUser();
  const { changep, globalEmail } = useContext(titleContext);
  console.log(globalEmail);


  const [form] = useForm();
  const [disabledSave, setDisabledSave] = useState(true);
  
  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
  //  console.log('err');
    setDisabledSave(hasErrors);
  }
  
  useEffect(() => {
    document.title = changep;
  });


  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 20000);
  };

  const changePass = (values) => {
    //console.log(pass);
    // event.preventDefault();
    const email = values.email;
    const pass = values.password;

    http
      .patch("/changepassword", { email: email, password: pass })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          notification.success({
            description: "Password Changed Successfully",
            placement: "topRight",
            top: 50,
          });
          setLoadings([false]);
        } else {
          notification.success({
            description: "You are Not Authorized",
            placement: "topRight",
            top: 50,
          });
          setLoadings([false]);
        }
      });
  };
  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card
          title="Change Password"
          bordered={false}
          style={{
            width: 900,
          }}
        >
          <Form
            name="basic"
            labelCol={{
              span: 3,
            }}
            wrapperCol={{
              span: 10,
            }}
            initialValues={{
              remember: true,
            }}
            onFieldsChange={handleFormChange} form={form}
            onFinish={(values) => changePass(values)}

            autoComplete="off"
          >
            <Form.Item
              disabled
              name="email"
              label="Email"
              initialValue={globalEmail}
              rules={[
                {
                  required: "true",
                  type: "email",
                  message: "Email can't be empty",
                },
              ]}
            >
              <Input disabled={true} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: "true",
                  message: "Password can't be empty",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 3,
                span: 10,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                disabled={disabledSave}
                loading={loadings[1]}
                onClick={() => {
                  enterLoading(1);
                }}
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Changepassword;
//onChange={(e) => setPass(e.target.value)}
