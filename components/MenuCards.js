import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function MenuCards() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F502b3c6a-ec20-11e8-8888-d940336e3709.jpg?crop=2208%2C3311%2C1892%2C8"
      />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>$5</Card.Text>
        <Button variant="primary">Add To Card</Button>
      </Card.Body>
    </Card>
  );
}
