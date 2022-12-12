import React from "react";
import "./Home.scss";
import {
  TwitterOutlined,
  InstagramOutlined,
  WhatsAppOutlined,
  FacebookOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import Carousel1 from "./Carousel1";

const Home = () => {
  return (
    <div className="home">
      <h2>Most viewed products</h2>
      <Carousel1 />
      <div className="footerdiv">
        <div className="item1">
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

        <div className="item2">
          <h4>About</h4>
          <br />
          Webpage designed to bring the client the best exoerience game-wise, acknlowledged throughout most of the countries in Europe, our desi
          re is to bring the best videogaming experience, bringing the top notch products to you, our customers. 
        </div>

        <div className="item3">
          <h4>Contact Us</h4>
          <p>
            <TwitterOutlined /> Twitter
          </p>
          <p>
            <InstagramOutlined /> Instagram
          </p>
          <p>
            <WhatsAppOutlined /> Whatsapp{" "}
          </p>
          <p>
            <FacebookOutlined />
            Facebook
          </p>
          <p>
            <YoutubeOutlined /> Youtube
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
