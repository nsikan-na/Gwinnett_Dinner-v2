import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { LocationContext } from "../context/LocationContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function RunningTotal() {
  const { runningTotal, setRunningTotal, cart } = useContext(LocationContext);

  useEffect(() => {
    if (cart.length === 0) return;
    const total = 0;
    cart.forEach((item) => {
      total += +item.price*item.quantity;
    });
    setRunningTotal(total);
  }, [cart, setRunningTotal]);

  useEffect(() => {
    if (cart.length === 0) return;
    console.log(cart, runningTotal);
  }, [runningTotal]);
  return (
    <Container className="">
      <Row>
        <Col>
      <h3 className="">Total: ${+runningTotal}</h3>
      </Col>
      <Col>
        <Button variant="primary" className="">
          View Cart
        </Button>
        </Col>
        </Row>
    </Container>
  );
}
