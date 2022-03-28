import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import { Context } from "../context";

export default function Footer() {
  const { location }: any = useContext(Context);

  return (
    <Container className="text-center fixed bottom-0 bg-gray-50 pt-2">
      <h6 className="">Gwinnett Diner {location ? `@ ${location}` : ""}</h6>
    </Container>
  );
}
