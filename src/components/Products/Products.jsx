import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/ProductContext/ProductState';
import Product from "./Product/Product";
import './Products.scss'

const Products = () => {
  const { getCategories, getProducts, categories } = useContext(ProductContext);
  const [ search, setSearch ] = useState('');
  const [ minPrice, setMinPrice ] = useState(1);
  const [ maxPrice, setMaxPrice ] = useState(9999);

  const categoriesList = categories.map(category => <li key={category.id}>{category.name}</li>)

  useEffect(() => {
    getCategories();
    getProducts(search, 0, minPrice, maxPrice, 'asc');
    // eslint-disable-next-line
  }, [search, minPrice, maxPrice]);

  const eraseCurrency = (e) => {
    e.target.value = e.target.value.slice(0, -1);
  }

  const addCurrency = (e) => {
    if(e.target.value === '') {
      if(e.target.name === 'min-price') {
        e.target.value = "1"
        setMinPrice(1);
      } else if(e.target.name === 'max-price') {
        e.target.value = "9999"
        setMaxPrice(9999);
      }
    }
    e.target.value = e.target.value + '$';
  }

  const validateInput = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  }

  const validateMinPrice = (e) => {
    e.preventDefault();
    const input = e.target;
    if(input.value === '') {
      setMinPrice(1);
      return;
    }
    if(parseInt(input.value) > maxPrice)  {
      input.value = maxPrice
    }
    if(parseInt(input.value) < 0) {
      input.value = "1";
    }
    setMinPrice(parseInt(input.value));
  }
  
  const validateMaxPrice = (e) => {
    e.preventDefault();
    const input = e.target;
    if(input.value === '') {
      setMaxPrice(9999);
      return;
    }
    if(parseInt(input.value) < minPrice)
      input.value = minPrice
    if(parseInt(input.value) > 9999)
      input.value = "9999";
    setMaxPrice(parseInt(input.value));
  }

  return (
    <div className='products-view'>
      <div className='products-view-container'>
        <div className='filters-sidebar'>
          <div className='categories-filter'>
            <span className='categories-filter-header'>Categories</span>
            <ul>
              {categoriesList}
            </ul>
          </div>
          <div className='price-filter'>
            <span className='price-filter-header'>Price</span>
            <div className="inputs-price">
              <div className="price-limit">
                <label  className="price-label"> Min: </label> 
                <input  className="price-input"
                        name="min-price" 
                        onFocus={eraseCurrency}
                        onBlur={addCurrency}
                        onKeyPress={validateInput}
                        onChange={validateMinPrice}
                        defaultValue={minPrice + '$'} /> 
              </div>
              <div className="price-limit">
                <label  className="price-label"> Max: </label> 
                <input  className="price-input" 
                        name="max-price" 
                        onFocus={eraseCurrency}
                        onBlur={addCurrency}
                        onKeyPress={validateInput}
                        onChange={validateMaxPrice}
                        defaultValue={maxPrice + '$'}/>
              </div>
            </div>
          </div>
        </div>
        <div className='products'>
          <form>
            <input type='text' className='search' placeholder='Search a product...' value={search} onChange={(e) => setSearch(e.target.value)}/>
          </form>
          <div className='products-container'>
            <Product />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products