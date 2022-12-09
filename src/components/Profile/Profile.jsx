import React from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext/UserState";
import "./Profile.scss";
import { Card, Button } from "antd";
import { UserOutlined, MailOutlined, ShopOutlined } from "@ant-design/icons";

const Profile = () => {
  const { getUserInfo, user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);

  if (!user) {
    return <span>Cargando...</span>;
  }
  return (
    <div className="padrecontainer">
    <div className="containerprofile">
      <div className="menuProfile">
        <p> <UserOutlined /> INFO</p>
        <br />
        <p> <ShopOutlined /> Orders</p>
        <br />
        <p>My favorite Products</p>
        <br />
        <Button onClick={logoutUser}>Logout</Button>
      </div>

      <div className="site-card-border-less-wrapper" />

      <Card
        className="cardprofile"
        title={user.name}
        bordered={true}
        style={{
          width: 210,
          border: "2px solid green",
        }}
      >
        
        <p>
          <MailOutlined /> {user.email}
        </p>
        <br />
        <p>
          <UserOutlined /> {user.role}
        </p>
      </Card>
    </div>
    </div> 
  );
};

export default Profile;
