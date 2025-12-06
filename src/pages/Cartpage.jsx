import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Cart.css";

function CartPage() {
  const { cart, addToCart, decreaseQty, getTotalPrice } = useContext(CartContext);

  const subtotal = getTotalPrice();
  const deliveryCharge = subtotal > 0 ? 25 : 0;
  const gst = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
  const grandTotal = subtotal + deliveryCharge + gst;

  return (
    <div className="cart-container">

      <h2 className="cart-title" style={{color:"white"}}>🛒 Your Cart</h2>

     
      {cart.length === 0 && (
        <div className="cart-empty">
          <img src="/emptyCart.png" alt="Empty" className="empty-img"   style={{color:"white"}}/>
          <h3 style={{color:"white"}}>Your cart is empty</h3>
          <p  style={{color:"white"}}>Add items to proceed</p>
        </div>
      )}

      
      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <div className="cart-item-info">
            <img src={item.image} alt={item.name} className="cart-img" />

            <div>
              <h4 className="cart-item-name">{item.name}</h4>
              <p className="cart-item-price">{item.price}</p>
            </div>
          </div>

          <div className="item-counter">
            <button className="qty-btn" style={{color:"white"}} onClick={() => decreaseQty(item.id)}>
              -
            </button>

            <span className="qty-count">{item.qty}</span>

            <button className="qty-btn" style={{color:"white"}} onClick={() => addToCart(item)}>
              +
            </button>
          </div>
        </div>
      ))}

      
      {cart.length > 0 && (
        <div className="bill-box">
          <h3>Bill Details</h3>

          <div className="bill-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="bill-row">
            <span>Delivery Charge</span>
            <span>₹{deliveryCharge}</span>
          </div>

          <div className="bill-row">
            <span>GST (5%)</span>
            <span>₹{gst}</span>
          </div>

          <hr />

          <div className="total" style={{width:"50%",height:"50%"}}>
            <strong>Total</strong>
            <strong style={{paddingLeft:"490px"}}>₹{grandTotal}</strong>
          </div>
        </div>
      )}

      
      {cart.length > 0 && (
        <div className="checkout-bar">
          <div className="checkout-left">
            <strong>₹{grandTotal}</strong>
            <span>Total Amount</span>
          </div>

          <button className="checkout-btn">Proceed to Checkout ➜</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
