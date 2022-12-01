import React, { useContext } from 'react'
import { ProductContext } from '../../../context/ProductContext/ProductState.js';
import './Product.scss'

const Product = () => {
  const { products, addCart} = useContext(ProductContext);

  const getInfoRating = (product) => {
    const number_reviews = product.Reviews.length;
    const sum_rating = product.Reviews.map((review) => review.rating).reduce((a, b) => a + b);
    const average_rating = sum_rating/number_reviews;
  
    return [Math.round(average_rating), number_reviews]
  }

  const getReviewsStar = (product) => {
    if(product.Reviews.length > 0) {
      const info_rating = getInfoRating(product);
   
      return (
        <div>
          { [1, 2, 3, 4, 5].map(( number, idx) => number <= info_rating[0] ? <span key={idx} className="fa fa-star checked"></span> : <span key={idx} className="fa fa-star"></span>)}
          <span>({info_rating[1]})</span>
        </div>
      );

    } else {
      return null;
    }
  }

  

  const productCards = products.map(product => {
    return (
      <div className='product-card' key={product.id}>
        <div className="product-img"><img className="card-img" src={'http://localhost:3001/' + product.img_product} alt='Product' /></div>
        <div className="product-name">{product.name}</div>
        { getReviewsStar(product) }
        <div className="product-price">{product.price}$</div>
        <button onClick={() => addCart(product)}>Add Cart</button>
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