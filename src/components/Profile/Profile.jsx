import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext/UserState";
import "./Profile.scss";
import { Button, Empty } from "antd";
import {
    UserOutlined,
    MailOutlined,
    ShopOutlined,
    HeartOutlined,
    HomeOutlined,
    PhoneOutlined,
    SmileOutlined,
    LogoutOutlined,
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
                          <b>Order {i + 1}</b>
                          <div className="d-flex header-group">
                              <b>Date:</b>
                              {order.date.slice(8, 10) +
                                  "/" +
                                  order.date.slice(5, 7) +
                                  "/" +
                                  order.date.slice(0, 4)}
                          </div>
                          <div className="d-flex header-group">
                              <b>Total price:</b>
                              <span>
                                  {order.Products.map(
                                      (product) =>
                                          product.price *
                                          product.Order_detail.amount
                                  )
                                      .reduce((a, b) => a + b)
                                      .toFixed(2)}
                                  $
                              </span>
                          </div>
                      </div>
                      <div className="order-products bg-white">
                          {order.Products.map((product, i) => {
                              return (
                                  <div
                                      key={i}
                                      className="d-flex justify-content-around align-items-center product"
                                  >
                                      <span>
                                          {product.Order_detail.amount}x
                                      </span>
                                      <span className="name">
                                          {product.name}
                                      </span>
                                      <img
                                          src={
                                              "http://localhost:3001/" +
                                              product.img_product
                                          }
                                          alt=""
                                      />
                                      <span className="price">
                                          {product.price}$
                                      </span>
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
                <div className="menu">
                    <div onClick={() => setNavState(0)}>
                        <UserOutlined /> Info
                    </div>
                    <div onClick={() => setNavState(1)}>
                        <ShopOutlined /> Orders
                    </div>
                    <div onClick={() => setNavState(2)}>
                        {" "}
                        <HeartOutlined /> My favorite Products
                    </div>
                    <Button className="mt-2 logout" onClick={logoutUser}>
                        Logout <LogoutOutlined />
                    </Button>
                </div>
            </div>
            <div className="contentProfile">
                {navState === 0 ? (
                    <div className="d-flex flex-column align-items-center justify-content-center w-100">
                        <h1>My profile</h1>
                        <div className="cardprofile mt-4">
                            <div className="profile-pic">
                                <img
                                    src={
                                        "http://localhost:3001/" + user.user_img
                                    }
                                    alt="Profile pic"
                                />
                            </div>
                            <div className="info">
                                <SmileOutlined /> Male
                            </div>
                            <div className="info">
                                <UserOutlined /> Age: 26
                            </div>
                            <div className="info">
                                <PhoneOutlined /> Phone Number: 612 - 654 - 986
                            </div>

                            <div className="info">
                                <MailOutlined /> {user.email}
                            </div>
                            <div className="info">
                                <HomeOutlined /> Direccion: Calle Almudin, 1,
                                Valencia
                            </div>
                        </div>
                    </div>
                ) : null}

                {navState === 1 ? (
                    <div className="d-flex align-items-center flex-column orders-container p-10">
                        <h1 className="mb-4">My orders</h1>
                        {ordersList}
                    </div>
                ) : null}

                {navState === 2 ? (
                    <div className="d-flex align-items-center flex-column">
                        <h1 className="mb-4">My favourite products</h1>

                        {user ? (
                            user.FavouriteProductsList.length ? (
                                <div className="favourite-container">
                                    {user.FavouriteProductsList.map(
                                        (product, i) => {
                                            return (
                                                <div
                                                    className="d-flex flex-column favourite-card"
                                                    onClick={() =>
                                                        navigate(
                                                            `/product-overview/${product.id}`
                                                        )
                                                    }
                                                    key={i}
                                                >
                                                    <div className="favourite-img">
                                                        <img
                                                            src={
                                                                "http://localhost:3001/" +
                                                                product.img_product
                                                            }
                                                            alt="product"
                                                        />
                                                    </div>
                                                    <div className="favourite-name">
                                                        {product.name}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            ) : (
                                <Empty />
                            )
                        ) : null}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Profile;
