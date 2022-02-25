import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Context } from "../context";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "react-bootstrap/Button";
export default function Footer() {
  const {
    location,
    runningTotal,
    cart,
    setCartModule,
  } = useContext(Context);

  return (
    <Container className="text-center sticky bottom-0 bg-white">
      <p> Gwinnett Dinner {location?`@ ${location}`:''}</p>
    </Container>
  );
}
