import { useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import { Button, notification, Form, Input } from "antd";
import { Layout, Row, Col } from "antd";
import { useContext } from "react";
import { titleContext } from "../App";
const { Content } = Layout;

export default function Login() {
  const [loadings, setLoadings] = useState([]);
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { logintitle } = useContext(titleContext);
  const [btndisabled, setbtndisabled] = useState(true);
  useEffect(() => {
    document.title = logintitle;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

  const submitForm = async () => {
    await http
      .post("/login", { email: email, password: password })
      .then((res) => {
       // console.log(res.data);
        if (res.data.error !== "Unauthorized") {
          //  console.log(res.data);
          setToken(res.data.user, res.data.access_token,res.data.superUser);
          // setUser(res.data.user);
        } else {
          notification.error({
            description: "Unauthorized Access",
            placement: "topRight",
            top: 50,
          });
          setLoadings([false]);
        }
        // setToken(res.data.user, res.data.access_token);
      });
  };
  const onValuesChange = (changedValues, allValues) => {
    //console.log(changedValues);
    if (
      allValues.email !== undefined &&
      allValues.password !== undefined &&
      allValues.email !== "" &&
      allValues.password !== ""
    ) {
      setbtndisabled(false);
    } else {
      setbtndisabled(true);
    }
   // console.log(allValues);
  };
  return (
    <Content style={{ marginTop: "5%" }}>
      <Row>
        <Col>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 15,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={submitForm}
            onValuesChange={onValuesChange}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              rules={[
                {
                  required: true,
                  type: "password",
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                disabled={btndisabled}
                loading={loadings[1]}
                onClick={() => {
                  enterLoading(1);
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Content>
  );
}
