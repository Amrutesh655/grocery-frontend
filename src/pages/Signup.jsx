import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://grocery-backend-new.onrender.com/signup", {
        fullName,
        email,
        password,
      });

      if (res.data.success) {
        navigate("/login");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Server error",err);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundSize: "cover",
      backgroundPosition:"right",
      backgroundRepeat: "no-repeat",
      backdropFilter: "brightness(0.8)",
        }}>
          
          <img src="/SignupImg.png" style={{width:"25%"}}></img>

      <Card style={{
         width: "29rem",
         height:"25rem",
         padding: "20px",
         borderRadius: "12px",
         background: "rgba(255, 255, 255, 0.15)",   
         backdropFilter: "blur(6px)",             
         boxShadow: "0px 6px 20px rgba(0,0,0,0.3)",
         color: "#fff",
         fontWeight:"600"
      }}>
        <h2 style={{ textAlign: "center", fontWeight:"700" }}>Create Account ✨</h2>

        <Form autoComplete="off" onSubmit={handleSignup}>
          <div className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{
               background: "rgba(255, 255, 255, 0.25)",
               border: "1px solid rgba(255, 255, 255, 0.4)",
               color: "#fff",
               fontWeight:"500"}}
            />
          </div>

          <div className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
               style={{
               background: "rgba(255, 255, 255, 0.25)",
               border: "1px solid rgba(255, 255, 255, 0.4)",
               color: "#fff",
               fontWeight:"500"}}
            />
          </div>

          <div className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
               style={{
               background: "rgba(255, 255, 255, 0.25)",
               border: "1px solid rgba(255, 255, 255, 0.4)",
               color: "#fff",
               fontWeight:"500"}}
            />
          </div>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <Button variant="success" className="" type="submit" style={{
              fontWeight:"700",
              background:"#FDE047",
              color:"black",
              border:"1px solid",
              width:"170px",
              height:"36px", 
              marginLeft:"27%",
              marginTop:"8px"
          }}>
            Create Account
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Signup;
