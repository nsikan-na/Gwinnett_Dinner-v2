import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function MenuCards({ title, price, desc, img, index }) {
  return (
    <Card className="w-72 my-2">
      <Card.Img variant="top" src={`/images/${img}`} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>${price}</Card.Text>
        <Card.Text>{desc}</Card.Text>
        <Button variant="primary" value={price} title={title}>
          Add To Card
        </Button>
      </Card.Body>
    </Card>
  );
}
