import React, { useEffect, useState } from "react";
import "./Login.scss";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext/UserState";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(UserContext);
  const [error, setError] = useState("");
  const [help, setHelp] = useState("");

  const navigate = useNavigate();
  const onFinish = async (values) => {
    const ok = await login(values);
    if(ok){
      setError("error")
      setHelp("Username or password incorrect")
    }
  };

  useEffect(() => {
    const foundToken = JSON.parse(localStorage.getItem("token"));
    if (foundToken) {
      navigate("/profile");
    }
  }, [login]);

  return (
    <div className="padreregister">
    <div className="containerlogin">
      <h4>Log in here</h4>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          className="input1"
          label="Email"
          name="email"
          validateStatus={error}
          help={help}
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            }
          ]}
          hasFeedback
        >
          <Input placeholder="type your email" />
        </Form.Item>

        <Form.Item
          className="input1"
          label="Password"
          name="password"
          validateStatus={error}
          help={help}
          rules={[
            { required: true, message: "Please input your password!" },
            { whitespace: true }
          ]}
          hasFeedback
        >
          <Input.Password placeholder="type your password" />
        </Form.Item>

        <Form.Item className="input1" wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default Login;
