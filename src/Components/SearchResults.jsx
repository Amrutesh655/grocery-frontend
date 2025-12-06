import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";

function SearchResults({ products, searchText }) {
  const [qty, setQty] = useState({});

  const search = searchText.toLowerCase();

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search)
  );

  const increaseQty = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Search results for: "{searchText}"</h3>

      {filtered.length === 0 ? (
        <p>No items found</p>
      ) : (
        <Row className="g-4 mt-3">
          {filtered.map((item) => (
            <Col md={3} key={item.id}>
              <Card className="shadow-sm p-3">
                <Card.Img
                  src={item.image}
                  style={{ height: "120px", objectFit: "contain" }}
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.price}</Card.Text>

                  {/* ADD + BUTTON */}
                  {!qty[item.id] || qty[item.id] === 0 ? (
                    <Button
                      style={{
                        backgroundColor: "white",
                        color: "#FF5555",
                        border: "1px solid #FF5555",
                        boxShadow: "0px 1px 10px rgba(0,0,0,0.4)",
                      }}
                      onClick={() => increaseQty(item.id)}
                    >
                      Add +
                    </Button>
                  ) : (
                    // COUNTER UI
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        border: "1px solid #0CA15C",
                        padding: "5px 8px",
                        borderRadius: "8px",
                      }}
                    >
                      <Button
                        variant="light"
                        onClick={() => decreaseQty(item.id)}
                        style={{ fontWeight: "bold" }}
                      >
                        -
                      </Button>

                      <span
                        style={{ fontSize: "18px", fontWeight: "600" }}
                      >
                        {qty[item.id]}
                      </span>

                      <Button
                        variant="light"
                        onClick={() => increaseQty(item.id)}
                        style={{ fontWeight: "bold" }}
                      >
                        +
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default SearchResults;
