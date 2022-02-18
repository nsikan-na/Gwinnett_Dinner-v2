import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function RunningTotal() {
  const [runningTotal, setRunningTotal] = useState(0);
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
