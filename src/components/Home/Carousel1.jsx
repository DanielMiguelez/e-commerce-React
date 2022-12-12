import React, { useContext, useState } from "react";
import { Carousel } from "antd";
import { ProductContext } from "../../context/ProductContext/ProductState";
import "./Carousel.scss"
import { useEffect } from "react";

const Carousel1 = () => {
  const { products,getProducts } = useContext(ProductContext);
  const [ filters ] = useState({
    search: "",
    minPrice: 1,
    maxPrice: 9999,
    orderPrice: '',
    categoryActive: 0
  });

  useEffect(() => {
    getProducts(filters.search, filters.categoryActive, filters.minPrice, filters.maxPrice, filters.orderPrice);
    // eslint-disable-next-line
  }, [filters]);
  const productImage = products.map((product, idx) => (
    
    <img
      key={idx}
      src={"http://localhost:3001/" + product.img_product}
      alt="Product"
    />
  ));
  return (
    <div className="container-carousel">

    <div className="img">

    <Carousel autoplay>
     

    {productImage}
    </Carousel>
    </div>
    </div>
  );
};
export default Carousel1;
