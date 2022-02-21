import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import { Context } from "../context";

export default function Footer() {
  const { location } = useContext(Context);

  return (
    <Container className="text-center sticky bottom-0 bg-white">
      Gwinnett Dinner @ {location}
    </Container>
  );
}
