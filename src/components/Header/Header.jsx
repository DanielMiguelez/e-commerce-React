import React  from 'react'
import { Link } from "react-router-dom";
import './Header.scss'
import { useContext } from "react";
import { UserContext } from "../../context/UserContext/UserState";

import {HomeOutlined, ShopOutlined, UserAddOutlined, UserOutlined, ShoppingCartOutlined} from "@ant-design/icons"
const Header = () => {
  const { token } = useContext(UserContext);
  return (
    <header>
      <nav>
            <Link to="/"> Home <HomeOutlined /> </Link>
            <Link to="/products"> Products <ShopOutlined /> </Link>
            <Link to="/cart">Cart<ShoppingCartOutlined /></Link>
          <div>
            {
                token 
                ?  <Link to="/profile">Profile <UserOutlined /></Link>

                : <><Link to="/register"><button>Register <UserAddOutlined /></button></Link>
                <Link to="/login"><button>Login <UserOutlined /></button></Link> </>
            }
           
          </div>
      </nav>
    </header>
  );
};

export default Header