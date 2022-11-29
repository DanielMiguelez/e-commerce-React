import React, { useContext } from 'react'
import { GlobalContext } from '../../../context/GlobalState.js';
import './Product.scss'

const Product = () => {
  const { products } = useContext(GlobalContext);
  const productCards = products.map(product => {
    return (
      <div className='product-card'>
        <div class="product-img"><img class="card-img" src={'http://localhost:3001/' + product.img_product} alt='Product' /></div>
        <div class="product-name">{product.name}</div>
        {/* Rating */}
        <div class="product-price">{product.price}$</div>
      </div>
    )
  })
  return (
    <>
     {productCards}
    </>
  )
}

export default Product