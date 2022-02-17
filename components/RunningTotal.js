import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export default function RunningTotal() {
  const [runningTotal, setRunningTotal] = useState(0);
  return (
    <div>
      <h3 className='centerText'>Total: ${+runningTotal}</h3>
      <Button variant="primary" style={{display:"flex", margin:"0 auto"}}>Proceed to Checkout</Button>
    </div>
  );
}
