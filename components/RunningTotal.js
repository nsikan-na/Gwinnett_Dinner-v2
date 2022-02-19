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
    setRunningTotal(
      cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
    );
  }, [cart, setRunningTotal]);

  useEffect(() => {
    if (cart.length === 0) return;
    console.log(cart, runningTotal);
  }, [runningTotal]);
  return <>Gwinnett Dinner</>;
}
