import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext/ProductState";
import Product from "./Product/Product";
import "./Products.scss";

const Products = () => {
  const { getCategories, getProducts, categories, cart } =
    useContext(ProductContext);
  const [search, setSearch] = useState("");

  const categoriesList = categories.map((category) => (
    <li key={category.id}>{category.name}</li>
  ));

  useEffect(() => {
    getCategories();
    getProducts(search, 0, 1, 9999, "asc");
    // eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="products-view">
      <div className="products-view-container">
        <div className="filters-sidebar">
          <span>Categories</span>
          <ul>{categoriesList}</ul>
        </div>
        <div className="products">
          <form>
            <input
              type="text"
              className="search"
              placeholder="Search a product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          <div className="products-container">
            <Product />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
