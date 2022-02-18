import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { LocationContext } from "../context/LocationContext";

export default function RunningTotal() {
  const { runningTotal, setRunningTotal, cart } = useContext(LocationContext);

  useEffect(() => {
    if (cart.length===0) return;
    console.log(cart);
    const total = 0;
    cart.forEach((item) => {
      total += +item.price;
    });
    setRunningTotal(total);
  }, [cart,setRunningTotal]);
  return (
    <Container className="">
      <h3 className="text-center my-4">Total: ${+runningTotal}</h3>
      <div className="flex justify-center">
        <Button variant="primary" className="">
          Proceed to Checkout
        </Button>
      </div>
    </Container>
  );
}
