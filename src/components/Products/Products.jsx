import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalState';
import Product from "./Product/Product";
import './Products.scss'

const Products = () => {
  const { getCategories, getProducts, categories } = useContext(GlobalContext);

  const categoriesList = categories.map(category => <li key={category.id}>{category.name}</li>)

  useEffect(() => {
    getCategories();
    getProducts('', 0, 1, 9999, 'asc');
    // eslint-disable-next-line
  }, []);

  return (
    <div className='products-view'>
      <div className='products-view-container'>
        <div className='filters-sidebar'>
          <span>Categories</span>
          <ul>
            {categoriesList}
          </ul>
        </div>
        <div className='products'>
          <form>
            <input type='text' className='search' placeholder='Search a product...'/>
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