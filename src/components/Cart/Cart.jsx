import { useContext, useEffect } from "react";
import { OrderContext } from "../../context/OrderContext/OrderState";
import { ProductContext } from "../../context/ProductContext/ProductState";
import "./Cart.scss";
import { Card, Button } from "antd";

const Cart = () => {
  const { cart, clearCart, createOrder, product } = useContext(ProductContext);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (cart.length <= 0) {
    return <span>No tienes ningún producto añadido</span>;
  }
  const createNewOrder = () => {
    createOrder(cart);
    clearCart();
  };

  const cartItem = cart.map((cartItem, i) => {
    return (
      <div className="card-container">
      <div className="productcardspace">
      
        <Card
          className="cardproduct"
          title={cartItem.name}
          bordered={true}
          style={{
            width: 250,
            border: "2px solid black",
          }}
        >
          <div className="product-img"><img className="card-img" src={'http://localhost:3001/' + cartItem.img_product} alt='Product' /></div>
          <p> {cartItem.price.toFixed(2)} €</p>
          <br />
          <p> {cartItem.description} €</p>
        
        </Card>
      </div>
      </div>
    );
  });
  return (
    <div>
      {cartItem} <Button onClick={() => clearCart()}>Clear cart</Button>
      <Button onClick={() => createNewOrder()}> Create Order</Button>
    </div>
  );
};

export default Cart;
