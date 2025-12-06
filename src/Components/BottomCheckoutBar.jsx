import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/BottomCheckoutBar.css";

function BottomCheckoutBar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.qty * parseInt(item.price),
    0
  );

  // Short product preview
  const firstItem = cart[0]?.name || "";
  const totalItems = cart.length;

  return (
    <div className="mini-checkout" style={{borderRadius:"20px"}}>
      <div className="mini-left">
        <strong style={{ fontSize: "15px" }}>{firstItem}</strong>
        <span style={{ fontSize: "13px", opacity: 0.8 }}>
          {totalItems} items 
        </span>
      </div>

      <button
        className="mini-btn"
        onClick={() => navigate("/cart")}
      >
        Checkout →
      </button>
    </div>
  );
}

export default BottomCheckoutBar;
