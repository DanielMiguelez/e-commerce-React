import React, { useEffect }  from 'react'
import { Link } from "react-router-dom";
import './Header.scss'
import { useContext } from "react";
import { UserContext } from "../../context/UserContext/UserState";
import {  Badge } from 'antd';
import {HomeOutlined, ShopOutlined, UserAddOutlined, UserOutlined, ShoppingCartOutlined} from "@ant-design/icons"
import { ProductContext } from '../../context/ProductContext/ProductState';
const Header = () => {
  const { token, user, getUserInfo } = useContext(UserContext);
  const { cart } = useContext(ProductContext);

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <header>
      <nav>
            <Link to="/"><span className='link-header'> Home <HomeOutlined /> </span></Link>
            <Link to="/products"><span className='link-header'> Products <ShopOutlined /> </span></Link>
            <Link to="/cart"> <span className='link-header'><Badge count={cart.length} size = "small"></Badge>Cart<ShoppingCartOutlined /></span></Link>
          <div className='d-flex'>
            {
                token 
                ?  <Link to="/profile"> <span className='link-header'>{user ? <><img src={"http://localhost:3001/" + user.user_img } alt="Profile" className='imageUser'/> {user.name} </>  : <><UserOutlined /> Profile </> }</span> </Link>

                : <><Link to="/register"><button className="d-flex align-items-center">Register <UserAddOutlined className='pl-2' /></button></Link>
                <Link to="/login"><button className="d-flex align-items-center">Login <UserOutlined className='pl-2' /></button></Link> </>
            }
           
          </div>
      </nav>
    </header>
  );
};

export default Header  