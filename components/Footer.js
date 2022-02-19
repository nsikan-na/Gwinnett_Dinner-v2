import React from "react";
import Container from "react-bootstrap/Container";
import RunningTotal from "./RunningTotal";

export default function Footer() {
  return (
    <Container className="text-center sticky bottom-0 bg-white">
      <RunningTotal />
    </Container>
  );
}
