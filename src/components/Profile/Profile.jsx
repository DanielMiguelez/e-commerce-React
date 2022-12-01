import React from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext/UserState";
import "./Profile.scss";
import { Card, Button } from 'antd';
import {UserOutlined, MailOutlined} from "@ant-design/icons"

const Profile = () => {
  const { getUserInfo, user, logout, register } = useContext(UserContext);
  const navigate = useNavigate()

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
    
    <div className="site-card-border-less-wrapper">
<Card className="cardprofile"
      title=  {user.name}
      bordered={true}
      style={{
        width: 210,
        border: "2px solid green",
      }}
    >
      <p><MailOutlined/> {user.email}</p>
      <br />
      <p> <UserOutlined /> {user.role}</p>

    </Card>
      <Button onClick={logoutUser}>Logout</Button>
    </div>
  );
};

export default Profile;
