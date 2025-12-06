import { useEffect,useState } from "react";
import { Row,Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"; 
import {ViewdairyData,ViewfruitsData, ViewvegetablesData,ViewsnacksData,ViewbeveragesData,viewbakeryData } from "../data/products";

function FullCategory({category}) {

     const [qty, setQty] = useState({});
    const [products,setProducts] =useState([]);

    const fetchAll = async () =>{
        if(category === "Fruits") {
            setProducts(ViewfruitsData);
        }
        else if(category === "Vegetables")
        {
            setProducts(ViewvegetablesData);
        } 
        else if(category === "Dairy"){
            setProducts(ViewdairyData);
        }
         else if(category === "Snacks"){
            setProducts(ViewsnacksData);
        }
        else if(category === "Beverages"){
            setProducts(ViewbeveragesData);
        }
        else if(category === "Bakery"){
            setProducts(viewbakeryData);
        }

    };

    useEffect(()=>{
        fetchAll();
    },[category]);

    const increaseQty = (id) => {
          setQty(prev => ({
            ...prev,
            [id]: (prev[id] || 0) +1
          }));
      }; 


      const decreaseQty = (id) =>{
          setQty(prev =>({
            ...prev,
            [id]:Math.max((prev[id] || 0)-1,0)
          }));
      };

     return (
    <div style={{padding:"15px",color:"white"}}>
      <h1>{category} - All Products</h1>

      <Row className="g-4">
        {products.slice(0, 20).map((item) => (
          <Col md={3} key={item.id}>
            <Card className="shadow-sm p-3" style={{
               width: "90%",
               height: "320px",
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
            }}>
              <Card.Img
                src={item.image}
                style={{ 
                   width: "150px",
                   height: "120px",
                   objectFit: "contain",
                   marginTop: "10px",
                   border:"3px"
                   }}
              />
              <Card.Body style={{paddingLeft:"88px"}}>
                <Card.Title  style={{
                    fontSize: "20px",
                    color: "white",
                    textAlign: "center",
                    margin: "10px 0",
                    paddingRight:"86px"
                    }}>
                  {item.name}
                  </Card.Title>

                <Card.Text style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0 5px",
                      marginBottom: "5px",
                      color:"white"
                      }} >
                  {item.price}
                  </Card.Text>

                {!qty[item.id] || qty[item.id] === 0 ? (
               <Button style={{
                width: "90px",
                height: "40px",
                background: "#06C167",
                color: "white",
                borderRadius: "30px",
                border: "none",
                fontSize: "22px",
                cursor: "pointer",
                marginRight:"80px",
                padding:"2px"
                
                }} onClick={()=> increaseQty(item.id)}>
                   Add +
               </Button>
                ) : (
               <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid #06C167",
                padding: "4px 10px",
                borderRadius: "10px",
               }}>
    
               <Button 
               variant="light" 
               onClick={()=> decreaseQty(item.id)} 
               style={{ 
                fontSize: "20px",
                  border: "none",
                  background: "transparent",
                  fontWeight: 700,
                  color: "white",
                }}>
                -
               </Button>

               <span style={{ fontSize: "20px", fontWeight: "700",color:"white" }}>
               {qty[item.id]}
               </span>

               <Button 
               variant="light" 
               onClick={()=> increaseQty(item.id)} 
               style={{ 
                fontSize: "20px",
                  border: "none",
                  background: "transparent",
                  fontWeight: 700,
                  color: "white",
                }}>
               +
               </Button>
               </div>   
               )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default FullCategory;

