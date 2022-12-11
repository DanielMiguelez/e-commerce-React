import { useContext, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext/ProductState";
import { Empty } from 'antd';
import "./Cart.scss";
import { UserContext } from "../../context/UserContext/UserState";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, clearCart, createOrder, addOneCart, removeOneCart, removeCartProduct } = useContext(ProductContext);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (cart.length <= 0) {
    return (
      <>
        <div className="d-flex justify-content-center"><span className="my-cart-header">My cart</span></div>
        <div className="empty-container">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} imageStyle={{height: 60,}}/>
          <p className="d-flex justify-content-center">Looks like your cart is empty. Go to products and add some!</p>
        </div>
        <div className="d-flex justify-content-center"><button className="btn btn-primary">Go products</button></div>
      </>
    );
  }
  const createNewOrder = async () => {
    if(token) {
      await createOrder(cart);
      clearCart();
    } else {
      navigate(
        "/login",
        {
            state: {
                nextUrl: `cart`
            }
        }
    );
    }
  };

  const cartItem = cart.map((cartItem, i) => {
    return (
      
        <div key={i} className="card-product">
          <div className="d-flex align-items-center delete">
            <button onClick={() => removeCartProduct(cartItem.product)} className="btn btn-danger"><i className="fa fa-trash"></i></button>
          </div>
          <div className="image-container"><img src={"http://localhost:3001/" + cartItem.product.img_product} alt="Cart Item Product"/></div>
          <div className="d-flex flex-column justify-content-center info">
            <span className="important-info">{cartItem.product.name}</span>
            <span className="important-info">{(cartItem.product.price * cartItem.amount).toFixed(2)}$</span>
            { cartItem.amount > 1 ? <span>{cartItem.amount + " units / " + cartItem.product.price + "$ each one" }</span> : null}
          </div>
          <div className="d-flex align-items-center amount">
            <div className="d-flex justify-content-center amount-form">
              <button onClick={() => removeOneCart(cartItem.product)}>-</button>
              <input type="text" value={cartItem.amount} readOnly />
              <button onClick={() => addOneCart(cartItem.product)}>+</button>
            </div>
          </div>
        </div>

    );
  });

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex justify-content-center"><span className="my-cart-header">My cart</span></div>
      <div className="card-container mt-3">
        {cartItem} 
      </div>
      <div className="d-flex align-items-center mt-4 buttons-cart">
        <div className="d-flex align-items-center justify-content-around">
          <button className="btn clear" onClick={() => clearCart()}>Clear cart</button>
          <span><b>Total price:</b> { (cart.map(item => item.amount*item.product.price).reduce((a,b) => a+b)).toFixed(2) }$</span>
          <button className="btn" onClick={() => createNewOrder()}>Buy</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
