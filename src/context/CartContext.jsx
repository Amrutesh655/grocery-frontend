import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);


  //  Add Item or Increase QTY
 
  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === item.id);

      if (exist) {
        // increase qty
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }

      // add new item with qty = 1
      return [...prev, { ...item, qty: 1 }];
    });
  };

 
  // Decrease Qty

  const decreaseQty = (id) => {
    setCart((prev) => {
      const item = prev.find((p) => p.id === id);

      if (!item) return prev;

      if (item.qty === 1) {
        // remove from cart
        return prev.filter((p) => p.id !== id);
      }

      // decrease qty
      return prev.map((p) =>
        p.id === id ? { ...p, qty: p.qty - 1 } : p
      );
    });
  };


  // Get qty of single item
 
  const getQty = (id) => {
    const item = cart.find((p) => p.id === id);
    return item ? item.qty : 0;
  };

  
  const extractPrice = (priceString) => {
    return parseInt(priceString.replace(/₹|\/.*/g, ""));
  };

  
  // TOTAL cart price
  
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = extractPrice(item.price);
      return total + price * item.qty;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQty,
        getQty,
        getTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
