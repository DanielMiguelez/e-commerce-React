import React from 'react'
import { Link } from "react-router-dom";
import './Header.scss'

const Header = () => {
  return (
    <header>
      <nav>
            <Link to="/"> Home </Link>
            <Link to="/products"> Products </Link>
          <div>
            <Link to="/register"><button>Register</button></Link>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/profile">Profile</Link>
          </div>
      </nav>
    </header>
  );
};

export default Header