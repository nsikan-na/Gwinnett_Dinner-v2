import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Context } from "../context";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "react-bootstrap/Button";

export default function Footer() {
  const { location, runningTotal, cart, setCartModule } = useContext(Context);

  return (
    <Container className="text-center sticky bottom-0 bg-white  py-2">
      {cart.length!==0?<div className="flex justify-center items-center space-x-10">
        <h5>Total-${runningTotal}</h5>
        <Button
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCartModule(true);
          }}
        >
          Checkout
        </Button>
      </div>:
      <div className="mt-3">
        <h6 className="">Gwinnett Dinner {location ? `@ ${location}` : ""}</h6>
      </div>}
    </Container>
  );
}
