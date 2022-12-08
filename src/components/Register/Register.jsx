import "./Register.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext/UserState";
import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();
  const [help, setHelp] = useState("");
  const [error, setError] = useState(false);

  const onFinish = async (values) => {
    const res = await register(values);
    if (res) {
      setError(res);
      setHelp("Email already exist");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <h4>Register yourself!</h4>
      <br />
      <Form
        name="register"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              type: "text",
              message: "Please input your name!",
            },
            { min: 3 },
          ]}
        >
          <Input placeholder="Input your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          validateStatus={error}
          help={help}
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input placeholder="Input your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              type: "password",
              message: "Please input your password!",
            },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Input your password" />
        </Form.Item>

        <Form.Item
          label="Password2"
          name="Password2"
          rules={[
            {
              required: true,
              type: "text",
              message: "Please input your password!",
            },
            {
              min: 3,
              message: "You need more than 3 characters",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Repeat the password" />
        </Form.Item>

        <Form.Item
          name="agreement"
          wrapperCol={{ span: 24 }}
          valuePropName="checked"
          rules={[{ required: true, message: "Accept our terms please" }]}
        >
          <Checkbox>
            {""}
            Agree to our <a href="#"> Terms and conditions to register</a>
          </Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
