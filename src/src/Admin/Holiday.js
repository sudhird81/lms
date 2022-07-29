import React from "react";
import { Button, Card, Form, Input, DatePicker, notification } from "antd";
import AuthUser from "../Pages/AuthUser";
import { useForm } from "antd/lib/form/Form";

const { RangePicker } = DatePicker;


const Holiday = () => {
  const { http } = AuthUser();

  const [form] = useForm();
  const submitHandle = (values) => {
    http
      .post("/holiday", {
        holiday: values.holiday,
        to: values.range_picker[1].format("YYYY-MM-DD"),
        from: values.range_picker[0].format("YYYY-MM-DD"),
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
            notification.success({
              description: "Holiday Announced Successfully",
              placement: "topRight",
              top: 50,
            });
          }
      });
  };
  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card
          title="Apply Leave"
          bordered={false}
          style={{
            width: 900,
          }}
        >
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 10,
            }}
            initialValues={{
              remember: true,
            }}
            form={form}
            onFinish={(values) => submitHandle(values)}
            autoComplete="off"

          >
            <Form.Item
              disabled
              name="holiday"
              label="Holiday"
              rules={[
                {
                  required: "true",
                  type: "Holiday",
                  message: "Holiday can't be empty",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="range_picker"
              label="Select To, From Date"
              rules={[
                {
                  required: "true",
                  message: "Holiday Date can't be empty",
                },
              ]}
            >
              <RangePicker format="DD-MMM-YYYY" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 10,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                //     disabled={btndisabled}
                //   loading={loadings}
              >
                Apply Leave
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Holiday;
