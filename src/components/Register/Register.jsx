import "./Register.scss";
import { useContext} from "react";
import { UserContext } from "../../context/UserContext/UserState";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(UserContext);
  const navigate = useNavigate()
  const onFinish = (values) => {
    register(values);
  };
 
  /*useEffect(() => {
    const userCreated = JSON.parse(localStorage.getItem("token"));
      navigate("/login");
    
}, [register]);*/

  return (
    <div className="container">
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
          rules={[{ 
            required: true,
            type: "text",
            message: "Please input your name!" 
          }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ 
            required: true,
            type: "email",
            message: "Please input your email!" 
          }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ 
            required: true,
            type: "password",
            message: "Please input your password!" 
          }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Password2"
          name="Password2"
          rules={[{ 
            required: true,
            type: "password",
            message: "Please input your name!" 
          }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
