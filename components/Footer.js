import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import { Context } from "../context";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "react-bootstrap/Button";

export default function Footer() {
  const { location, runningTotal, cart, setCartModule } = useContext(Context);
  const router = useRouter();
  return (
    <Container className="text-center fixed bottom-0 bg-gray-50">
      <h6 className="">Gwinnett Dinner {location ? `@ ${location}` : ""}</h6>
    </Container>
  );
}
