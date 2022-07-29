import { Button, Col, Form, Input, Row, notification, Card } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Content } from "antd/lib/layout/layout";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { titleContext } from "../App";
import AuthUser from "../Pages/AuthUser";

export default function Addemployee(props) {
  const { http } = AuthUser();
  const { addemp } = useContext(titleContext);
  const [form] = useForm();
  const [btndisabled, setBtndisabled] = useState(true);
  const [loadings, setLoadings] = useState();
 
  useEffect(() => {
    document.title = addemp;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ENtering into loading button state */

  const register = (values) => {
    //console.log(values);
    setLoadings(true)
    http
      .post("/addemployee", {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirm_password,
      })
      .then((res) => {
        if (res.status === 200) {
          form.resetFields();
          notification.success({
            description: "Employee Added Successfully",
            placement: "topRight",
            top: 50,
          });
        }
      })
      .catch(function (error) {
        notification.error({
          description: "Failed To Add Employee",
          placement: "topRight",
          top: 50,
        });
      }).finally(()=>{
        setLoadings(false);
      });
  };
 /* if errors disable buttons */

 const onValuesChange = () => {
  const hasErrors = form.getFieldError().some(({ errors }) => errors.length);
  setBtndisabled(hasErrors);
  
};
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="Add Employee"
        bordered={false}
        style={{
          width: 900,
        }}
      >
        <Form
          
          name="add_employee"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 10,
          }}
          initialValues={{
            remember: true,
          }}
          onFieldsChange={onValuesChange} form={form}
          onFinish={(values) => register(values)}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Employee Name"
            rules={[
              {
                required: "true",
                message: "Employee Name Cant Be Empty",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: "true",
                type: "email",
                message: "Email cant be empty",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: "true",
                message: "Password Cant Be Empty",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm_password"
            label="Confirm Password"
            rules={[
              {
                required: "true",
                message: "Password Cant Be Empty",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 10,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              disabled={btndisabled}
              loading={loadings}
            >
              Add Employee
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
