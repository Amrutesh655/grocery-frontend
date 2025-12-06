import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

function NavbarComp({ onSearchChange, location, setLocation }) {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, p) => sum + p.qty, 0);

  const [showModal, setShowModal] = useState(false);
  const [newLocation, setNewLocation] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMiniNav, setShowMiniNav] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(!!loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleSave = () => {
    if (newLocation.trim() !== "") {
      setLocation(newLocation);
    }
    setShowModal(false);
  };

  // MINI NAVBAR on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setShowMiniNav(true);
      } else {
        setShowMiniNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* MINI NAVBAR */}
      {showMiniNav && (
        <div
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            padding: "14px 20px",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "0.3s ease",
            backdropFilter: "blur(6px)",
            borderRadius: "12px",
         
          }}
        >
          <h5 style={{ margin: 0, fontWeight: "bold",color:"white" }}>GROCERYGO</h5>

          <Form className="d-flex mx-3" style={{ width: "40%" }}>
            <Form.Control
              type="search"
              placeholder="Search products"
              onChange={(e) => onSearchChange(e.target.value)}
              style={{borderRadius:"20px"}}
            />
          </Form>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {!isLoggedIn && (
              <span
                style={{ cursor: "pointer", fontWeight: "bold",color:"yellow",}}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            )}

            {isLoggedIn && (
              <span
                onClick={handleLogout}
                style={{ cursor: "pointer", fontWeight: "bold", color: "yellow" }}
              >
                Logout
              </span>
            )}

            <span
              style={{ cursor: "pointer", fontSize: "18px",color:"white" }}
              onClick={() => navigate("/cart")}
            >
              <img src={'/cartIMg.png'}
              alt="cart"
              style={{width: "31px", height: "31px", objectFit: "contain",}}/> ({cart.length})
            </span>
          </div>
        </div>
      )}

      {/* MAIN NAVBAR */}
      <Navbar
        expand="lg"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 998,
           backdropFilter: "blur(6px)",
           borderRadius: "12px",
           padding: "10px 20px",
           transition: "0.3s ease",
          
        }}
      >
        <Container fluid style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          gap:"20px"
        }}>
          <Navbar.Brand style={{color:"white",fontWeight:"700"}}>GROCERYGO</Navbar.Brand>

          <div
            onClick={() => setShowModal(true)}
            style={{
              marginLeft: "20px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "15px",
              color:"white",
             
            }}
          >
            📍 {location} <span style={{ fontSize: "13px" }}>▼</span>
          </div>

          <Navbar.Toggle aria-controls="navbarScroll" />

          <div className="d-flex justify-content-between align-items-center w-100">
            <Navbar.Collapse id="navbarScroll">
              <Form className="d-flex mx-auto" style={{ width: "60%",}}>
                <Form.Control
                  type="search"
                  placeholder="Search for Products"
                  onChange={(e) => onSearchChange(e.target.value)}
                  style={{fontWeight:"500"}}
                />
              </Form>

              <Nav
                className="me-auto my-2 my-lg-0 gap-5"
                style={{ maxHeight: "100px", alignItems: "end" }}
              >
                {!isLoggedIn && (
                  <Nav.Link style={{color:"yellow",}} onClick={() => navigate("/login")}>LOGIN</Nav.Link>
                )}

                {isLoggedIn && (
                  <button
                    onClick={handleLogout}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "yellow",
                      fontWeight: "bold",
                      cursor: "pointer",
                      paddingBottom:"13px",
                      
                    }}
                  >
                    Logout
                  </button>
                )}

                <Nav.Link style={{color:"white",}} onClick={() => navigate("/cart")}>
                   <img src={'/cartIMg.png'}
              alt="cart"
              style={{width: "31px", height: "31px", objectFit: "contain",}}/>({cart.length})
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>

      {/* LOCATION MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Delivery Location</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter city or pincode"
            onChange={(e) => setNewLocation(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>

          <Button variant="success" onClick={handleSave}>
            Save Location
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavbarComp;
