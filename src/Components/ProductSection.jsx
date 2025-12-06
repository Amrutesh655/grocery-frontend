import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { fruitsData, vegetablesData, dairyData, SnacksData, beveragesData, bakeryData, } from '../data/products';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import "../styles/ProductSection.css";

function ProductSection({ category, searchText }) {
   
   const [products, setProducts] = useState([]);
  const { addToCart, decreaseQty, cart } = useContext(CartContext);

  const navigate = useNavigate();

  const getQty = (id) => {
    const item = cart.find((p) => p.id === id);
    return item ? item.qty : 0;
  };

  // Load category products
  useEffect(() => {
    if (category === "Fruits") setProducts(fruitsData);
    else if (category === "Vegetables") setProducts(vegetablesData);
    else if (category === "Dairy") setProducts(dairyData);
    else if (category === "Snacks") setProducts(SnacksData);
    else if (category === "Beverages") setProducts(beveragesData);
    else if (category === "Bakery") setProducts(bakeryData);
  }, [category]);

  // Search Filter
  const filteredProducts = products.filter((item) => {
    const name = item.name.toLowerCase();
    const query = (searchText || "").toLowerCase();
    return name.includes(query);
  });

  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 5px",
        }}
      >
        <h1 style={{ margin: 0,color:"white" }}>{category}</h1>

        <button
          onClick={() => navigate(`/category/${category}`)}
          style={{
            padding: "6px 15px",
            borderRadius: "8px",
            background: "#FDE047",
            color: "black",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
          }}
        >
          View All
        </button>
      </div>

     <Row className="g-4" style={{ marginTop: "5px" }}>
  {filteredProducts.map((item) => (
    <Col md={4} key={item.id}>
      <div
        style={{
          width: "90%",
          height: "300px",
          borderRadius: "22px",
          padding: "20px",
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "0.3s ease",
          margin:"15px"
        }}
      >
        {/* PRODUCT IMAGE */}
        <img
          src={item.image}
          style={{
            width: "150px",
            height: "120px",
            objectFit: "contain",
            marginTop: "10px",
          }}
        />

        {/* PRODUCT NAME */}
        <h5
          style={{
            fontSize: "20px",
            color: "white",
            textAlign: "center",
            margin: "10px 0",
          }}
        >
          {item.name}
        </h5>

        {/* PRICE + ADD BUTTON IN ONE ROW */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 5px",
            marginBottom: "5px",
          }}
        >
          {/* PRICE */}
          <span
            style={{
              fontSize: "18px",
              color: "#73ff8f",
              fontWeight: "600",
              marginLeft:"40px",
            }}
          >
            {item.price} 
          </span>

          {/* ADD OR QTY BUTTON */}
          {getQty(item.id) === 0 ? (
            <button
              onClick={() => addToCart(item)}
              style={{
                width: "90px",
                height: "40px",
                background: "#06C167",
                color: "white",
                borderRadius: "30px",
                border: "none",
                fontSize: "22px",
                cursor: "pointer",
                marginRight:"40px",
                padding:"1px",
              }}
            >
              Add+
            </button>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid #06C167",
                padding: "4px 10px",
                borderRadius: "10px",
              }}
            >
              <button
                onClick={() => decreaseQty(item.id)}
                style={{
                  fontSize: "20px",
                  border: "none",
                  background: "transparent",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                -
              </button>

              <span style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>
                {getQty(item.id)}
              </span>

              <button
                onClick={() => addToCart(item)}
                style={{
                  fontSize: "20px",
                  border: "none",
                  background: "transparent",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </Col>
  ))}
</Row>

     
    </div>
  );
}


export default ProductSection;
