import React, { useEffect } from "react";
import "./Login.scss";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext/UserState";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(UserContext);
  // eslint-disable-next-line
  const navigate = useNavigate();
  const onFinish = (values) => {
    login(values);
  };


  useEffect(() => {
      const foundToken = JSON.parse(localStorage.getItem("token"));
      if (foundToken) {
        navigate("/profile");
      }
      
  }, [login]);

  return (
    <div className="container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item className="input1"
          label="Email"
          name="email"
          rules={[{ required: true,
            type:"email",
            message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item className="input1"
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className="input1" wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
