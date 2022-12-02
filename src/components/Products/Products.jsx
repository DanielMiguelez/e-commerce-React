import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext/ProductState";
import Product from "./Product/Product";
import "./Products.scss";
import SidebarFilters from "./SidebarFilters/SidebarFilters";

const Products = () => {
  const { getCategories, getProducts } = useContext(ProductContext);
  const [ filters, setFilters ] = useState({
    search: "",
    minPrice: 1,
    maxPrice: 9999,
    orderPrice: '',
    categoryActive: 0
  });

  useEffect(() => {
    getCategories();
    getProducts(filters.search, filters.categoryActive, filters.minPrice, filters.maxPrice, filters.orderPrice);
    // eslint-disable-next-line
  }, [filters]);

  return (
    <div className='products-view'>
      <div className='products-view-container'>
        <div className='sidebar-filters'>
          <SidebarFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className="products">
          <form>
            <input
              type="text"
              className="search"
              placeholder="Search a product..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
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
