import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import  Form  from 'react-bootstrap/Form';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



function Login() {

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();

        try{
            const res = await axios.post("https://grocery-backend-new.onrender.com/login",{
                email,
                password,
            });

            if(res.data.success){
                localStorage.setItem("isLoggedIn", "true");
                navigate("/");
            }else{
                setError(res.data.message);
            }
        }catch (err){
            setError("server error",err);
        }
    };


  return (
     <div  className="logindiv"   
     style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundSize: "cover",
      backgroundPosition:"right",
      backgroundRepeat: "no-repeat",
      backdropFilter: "brightness(0.8)"
       }}>
        <img src='/LoginToyImg.png' style={{width:"25%"}}></img>
     <Card style={{
       width: "29rem",
       height:"25rem",
       padding: "20px",
       borderRadius: "12px",
       background: "rgba(255, 255, 255, 0.15)",   
       backdropFilter: "blur(6px)",             
       boxShadow: "0px 6px 20px rgba(0,0,0,0.3)",
       color: "#fff",
       fontWeight:"700"
       }}>

        <h1 className="Card.Title" style={{ textAlign: "center",}}>Welcome</h1>
        <p className="card-title" style={{ textAlign: "center",fontWeight:"700"}}>Please login to continue</p>

        <Form autoComplete='off' onSubmit={handleLogin}>
          <div className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
             type="email"
             placeholder="name@example.com"
             autoComplete="new-email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             style={{
               background: "rgba(255, 255, 255, 0.25)",
               border: "1px solid rgba(255, 255, 255, 0.4)",
               color: "#fff",
               fontWeight:"600"
              }}
             />
          </div>

          <div className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
             type="password"
             placeholder="Enter Password"
             autoComplete="new-password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             style={{
              background: "rgba(255, 255, 255, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              color: "#fff",
              fontWeight:"600",
              }}/>
          </div>

         {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Button  type="submit" style={{
              fontWeight:"700",
              background:"#FDE047",
              color:"black",
              border:"1px solid",
              width:"85px",
              height:"36px"}}
              >Login
            </Button>
          </div>
        </Form>
         <p className="text-center mt-3">
          Don’t have an account ?{" "}
          <a href="/signup" style={{
            textDecoration: "none",
            fontWeight:"700",
            color:"white",
            borderBottom:"2px solid white" }}
            >
            Sign up
          </a>
        </p>
      </Card>
    </div>
  );
}

export default Login;