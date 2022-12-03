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
            <Link to="/"><span className='link-header'> Home <HomeOutlined /> </span></Link>
            <Link to="/products"><span className='link-header'> Products <ShopOutlined /> </span></Link>
            <Link to="/cart"><span className='link-header'>Cart<ShoppingCartOutlined /></span></Link>
          <div className='d-flex'>
            {
                token 
                ?  <Link to="/profile">Profile <UserOutlined /></Link>

                : <><Link to="/register"><button className="d-flex align-items-center">Register <UserAddOutlined className='pl-2' /></button></Link>
                <Link to="/login"><button className="d-flex align-items-center">Login <UserOutlined className='pl-2' /></button></Link> </>
            }
           
          </div>
      </nav>
    </header>
  );
};

export default Header