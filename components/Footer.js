import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Context } from "../context";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "react-bootstrap/Button";
export default function Footer() {
  const {
    location,
    runningTotal,
    setRunningTotal,
    cart,
    setCartModule,
    payment,
  } = useContext(Context);

  return (
    <Container
      className={`text-center sticky bottom-0 bg-white ${
        cart.length !== 0 ? "p-2" : ""
      }`}
    >
      {cart.length !== 0 ? (
        <Container className="flex justify-center space-x-16">
          <h4>Total: ${runningTotal}</h4>
          <Button
            variant="primary"
            onClick={() => {
              setCartModule(true);
            }}
          >
            Proceed to Checkout
          </Button>
        </Container>
      ) : (
        <p> Gwinnett Dinner @ {location}</p>
      )}
    </Container>
  );
}
