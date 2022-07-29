import React, { useContext, useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import {
  DatePicker,
  Button,
  notification,
  Form,
  Input,
  Select,
  Card,
} from "antd";
import { titleContext } from "../App";
import moment from "moment";
import { useForm } from "antd/lib/form/Form";

const { RangePicker } = DatePicker;

const Applyleave = () => {
  const [loadings, setLoadings] = useState();
  const { applyleave, globalEmail } = useContext(titleContext);

  const { http } = AuthUser();

  const [form] = useForm();
  const [btndisabled, setBtndisabled] = useState(true);

  /* Getting current month start and end date */
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  /* setting title */
  useEffect(() => {
    document.title = applyleave;
  });

  /* Submiting leave to api  */
  const submitLeave = (values) => {
    setLoadings(true);
    http
      .post("/applyleave", {
        type: values.type,
        toDate: values.range_picker[1].format("YYYY-MM-DD"),
        FromDate: values.range_picker[0].format("YYYY-MM-DD"),
        Description: values.description,
        Status: 1,
      })
      .then((res) => {
        //console.log(res);
        if (res.status === 200) {
          notification.success({
            description: "Leave Applied Successfully",
            placement: "topRight",
            top: 50,
          });
          setLoadings(false);
        }
      })
      .catch(function (error) {
        console.log(error.response.request.status);
        if (error.response.request.status === 401) {
          notification.error({
            description: "Session Expired, Relogin",
            placement: "topRight",
            top: 50,
          });
          setLoadings(false);
        }
      });
  };
  /* If Errors Disabling button */
  const onValuesChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setBtndisabled(hasErrors);
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
              span: 8,
            }}
            wrapperCol={{
              span: 20,
            }}
            initialValues={{
              remember: true,
              range_picker: [
                moment(firstDay, "DD/MM/YYYY"),
                moment(lastDay, "DD/MM/YYYY"),
              ],
            }}
            onFieldsChange={onValuesChange}
            form={form}
            onFinish={(values) => submitLeave(values)}
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
              name="type"
              label="Leave Type"
              rules={[
                {
                  required: "true",
                  message: "Leave type can't be empty",
                },
              ]}
            >
              <Select placeholder="Please select a Leave Type">
                <Select.Option value="SL">Sick Leave</Select.Option>
                <Select.Option value="CL">Casual Leave</Select.Option>
                <Select.Option value="COFF">Compensatory Off</Select.Option>
                <Select.Option value="LWP">LWP</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="range_picker"
              label="Select To, From Date"
              rules={[
                {
                  required: "true",
                  message: "Leave Date can't be empty",
                },
              ]}
            >
              <RangePicker
                format="DD-MMM-YYYY"

              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Reason"
              rules={[
                {
                  required: "true",
                  message: "Description can't be empty",
                },
                {
                  min: 3,
                  message: "Reason must be minimum 3 characters.",
                },
              ]}
            >
              <Input />
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
                disabled={btndisabled}
               loading={loadings}
                
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

export default Applyleave;
