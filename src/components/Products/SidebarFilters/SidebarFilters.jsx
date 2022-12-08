import React, { useContext } from "react";
import { ProductContext } from "../../../context/ProductContext/ProductState";
import { printReviewsStar } from '../../../utils/rating';
import './SidebarFilters.scss'

const SidebarFilters = (props) => {
    const { categories } = useContext(ProductContext);
    const categories_filter = [{id: 0, name: 'All Categories'}, ...categories]
    const filters = props.filters;
    const setFilters = props.setFilters;

    const categoryClick = (e) => {
        setFilters( {...filters, categoryActive: parseInt(e.target.id.replace("category", "") )} );
    }

    const eraseCurrency = (e) => {
        e.target.value = e.target.value.slice(0, -1);
    };

    const blurHandler = (e) => {
        if (e.target.name === "min-price") {
            validateMinPrice(e);
        } else if (e.target.name === "max-price") {
            validateMaxPrice(e);
        }

        addCurrency(e);
    };

    const addCurrency = (e) => {
        e.target.value = e.target.value + "$";
    };

    const validateInput = (e) => {
        if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
        }
    };

    const validateMinPrice = (e) => {
        e.preventDefault();
        const input = e.target;

        if (input.value === "" || parseInt(input.value) < 1) {
        e.target.value = "1";
        } else if (parseInt(input.value) > filters.maxPrice) {
        input.value = filters.maxPrice;
        }
        setFilters({...filters, minPrice: parseInt(input.value)});
    };

    const validateMaxPrice = (e) => {
        e.preventDefault();
        const input = e.target;

        if (input.value === "" || parseInt(input.value) > 9999) {
        e.target.value = "9999";
        } else if (parseInt(input.value) < filters.minPrice) input.value = filters.minPrice;
        setFilters({...filters, maxPrice: parseInt(input.value)});
    };

    const categoriesList = categories_filter.map((category) => (
        category.id === filters.categoryActive ? <li className="category-selected" key={category.id} id={'category' + category.id} onClick={categoryClick}>{category.name}</li> : <li key={category.id} id={'category' + category.id} onClick={categoryClick}>{category.name}</li>
    ));

  return (
    <>
      <div className="categories-filter">
        <span className="categories-filter-header">Categories</span>
        <ul>{categoriesList}</ul>
      </div>
      <div className="price-filter">
        <span className="price-filter-header">Price</span>
        <div className="inputs-price">
          <div className="price-limit">
            <label className="price-label"> Min: </label>
            <input
              className="price-input form-control"
              name="min-price"
              onFocus={eraseCurrency}
              onBlur={blurHandler}
              onKeyPress={validateInput}
              defaultValue={filters.minPrice + "$"}
            />
          </div>
          <div className="price-limit">
            <label className="price-label"> Max: </label>
            <input
              className="price-input form-control"
              name="max-price"
              onFocus={eraseCurrency}
              onBlur={blurHandler}
              onKeyPress={validateInput}
              defaultValue={filters.maxPrice + "$"}
            />
          </div>
          <div className="price-order">
            <label className="price-label mb-2 mt-2"> Order: </label>
            <select className="form-select" aria-label="Order products select" value={filters.orderPrice} onChange={(e => setFilters({...filters, orderPrice: e.target.value}))}>
                <option value="">None</option>
                <option value="ASC">Lower to higher</option>
                <option value="DESC">Higher to lower</option>
            </select>
          </div>
        </div>
      </div>
      <div className="rating-filter">
        <span className="rating-filter-header">Rating</span>
        <div className="container-rating-filter">
          {[6,5,4,3,2,1].map(number => (
            number === 6 
              ? <div key={number} className={filters.rating_filter === number ? "filter filter-selected" : "filter"}>No rating filters</div> 
              : <div key={number} className={filters.rating_filter === number ? "filter filter-selected" : "filter"}>{printReviewsStar(number)} <span>or more...</span></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SidebarFilters;
