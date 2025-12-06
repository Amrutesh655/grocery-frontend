import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../styles/hero.css"
function Grid() {
  return (
    <div className='container-fluid  gradient-bg  py-5 '>
      <Row className='align-items-center '>
        <Col md={6} style={{paddingLeft:"180px",marginTop:"45px"}}>
        <h1 
  style={{
    fontSize: "48px",
    fontWeight: "700",
    marginBottom: "6px",
    color:"white"
  }}
>
  Fresh groceries
</h1>

<h1 
  style={{
    fontSize: "48px",
    fontWeight: "700",
    marginBottom: "3px",
    color:"white"
  }}
>
  delivered in
</h1>

<h1 
  style={{
    fontSize: "48px",
    fontWeight: "700",
    marginTop: "0px",
    marginBottom: "25px",
    color:"white"
  }}
>
  20 minutes.
</h1>

<p
  style={{
    fontSize: "18px",
    marginBottom: "5px",
    color:"#"
  }}
>
  Order fruits, vegetables, snacks
</p>

<p
  style={{
    fontSize: "18px",
    marginTop: "0px",
    marginBottom: "15px",
    color:"#ECF4E8",
  }}
>
  & more at the best prices.
</p>
        <button className="btn" style={{ padding:"10px",borderRadius:"10px",background:"#FDE047",fontSize:"17px",fontWeight:"700",color:"black"}}>Shop Now</button>
         </Col>
        <Col md={6} style={{paddingRight:"80px"}}>
        <img src="/HeroImg.png"  style={{marginLeft:"40px",paddingLeft:"35px",width:"78%",}}></img>
        </Col>
      </Row>
    
     </div>
  );
}

export default Grid;