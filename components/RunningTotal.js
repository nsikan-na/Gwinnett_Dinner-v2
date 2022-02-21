import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Context } from "../context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function RunningTotal() {
  const { runningTotal, setRunningTotal, cart,payment } = useContext(Context);

  useEffect(() => {
    if (cart.length === 0) return;
    setRunningTotal(
      cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
    );
  }, [cart, setRunningTotal]);

  useEffect(() => {
if (payment.length===0)return
if (cart.length === 0) return;
// console.log(payment);
  }, [runningTotal,payment,cart]);
  return <></>;
}
