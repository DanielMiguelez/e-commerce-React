import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext/UserState";
import "./Profile.scss";
import { Card, Button } from "antd";
import {
  UserOutlined,
  MailOutlined,
  ShopOutlined,
  HomeOutlined,
  PhoneOutlined,
  SmileOutlined,
} from "@ant-design/icons";

const Profile = () => {
  const { getUserInfo, user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [navState, setNavState] = useState(0);

  const ordersList = user
    ? user.Orders.map((order, i) => {
        return (
          <div key={i} className="order">
            <div className="order-header">
              {order.date.slice(8, 10) +
                "/" +
                order.date.slice(5, 7) +
                "/" +
                order.date.slice(0, 4)}
            </div>
            <div className="order-products bg-white">
              {order.Products.map((product, i) => {
                return (
                  <div key={i} className="d-flex justify-content-around align-items-center">
                    <span>{product.name}</span>
                    <img
                      src={"http://localhost:3001/" + product.img_product}
                      alt=""
                    />
                    <span>{product.price}$</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })
    : null;

  const logoutUser = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);

  if (!user) {
    return <span>Loading...</span>;
  }
  return (
    <div className="profile-container">
      <div className="menuProfile">
        <p onClick={() => setNavState(0)}>
          <UserOutlined /> INFO
        </p>
        <br />
        <p onClick={() => setNavState(1)}>
          <ShopOutlined /> Orders
        </p>
        <br />
        <p onClick={() => setNavState(2)}>
          {" "}
          <ShopOutlined /> My favorite Products
        </p>
        <br />
        <Button onClick={logoutUser}>Logout</Button>
      </div>
      <div className="contentProfile">
        
        <p className="loggeduser">  <SmileOutlined />YOUR INFO</p>
        {navState === 0 ? (
          <div className="d-flex flex-direction-column justify-content-center w-100 mb-4 ">
            <Card
              className="cardprofile "
              title={user.name} 
              bordered={true}
              style={{
                width: 400,
                height: 300,
              }}
            >
              <p>
                <SmileOutlined /> Male
              </p>
              <p>
              <UserOutlined /> Age: 26
              </p>
              <p>
                <PhoneOutlined /> Phone Number: 612 - 654 - 986
              </p>

              <p>
                <MailOutlined /> {user.email}
              </p>
              <p>
                <HomeOutlined /> Direccion: Calle Almudin, 1, Valencia
              </p>
            </Card>
          </div>
        ) : null}

        {navState === 1 ? (
          <div className="d-flex align-items-center flex-column orders-container p-10">
            {ordersList}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
