import React from "react";
import "./Home.scss";
import {TwitterOutlined, InstagramOutlined,WhatsAppOutlined, FacebookOutlined , YoutubeOutlined } from "@ant-design/icons"
import Carousel1 from "./Carousel1";
const Home = () => {
  return (
    <div className="home">
      <h2>Most viewed products</h2>
      <Carousel1/>
      <hr />
      <div className='footerdiv'>
  <div className='item1'>
    <h4>Categories</h4>
    <hr />
    <ul>
      <li>Computer Peripherals</li>
      <li>Components & storage</li>
      <li>Gaming</li>
      <li>Networking</li>
      <li>Software & services</li>
      <li>Computer System</li>
    </ul>
    </div>
  
    <div className='item2'>
    <h4>About</h4>
    <br />
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam sint in aperiam eaque, nobis illo modi quo itaque explicabo aliquam rem deleniti et quod error. Magnam magni consequuntur ipsum omnis excepturi enim maiores, adipisci distinctio quas. Doloribus similique voluptatibus autem.
    </div>

    <div className='item3'>
    <h4>Contact Us</h4>
      <p><TwitterOutlined/> Twitter</p>
      <p><InstagramOutlined /> Instagram</p>
      <p><WhatsAppOutlined /> Whatsapp </p>
      <p><FacebookOutlined />Facebook</p>
      <p><YoutubeOutlined /> Youtube</p>
     
    </div>
</div >
    </div>
  );
};

export default Home;
