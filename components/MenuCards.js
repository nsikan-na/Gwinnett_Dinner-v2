import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LocationContext } from "../context/LocationContext";

export default function MenuCards({ title, price, desc, img, index }) {
  const { setCart } = useContext(LocationContext);
  return (
    <Card className="w-72 my-2">
      <Card.Img variant="top" src={`/images/${img}`} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>${price}</Card.Text>
        <Card.Text>{desc}</Card.Text>
        <Button
          variant="primary"
          value={price}
          title={title}
          onClick={(e) => {
            e.preventDefault();
            setCart((prevCart) => [
              ...prevCart,
              { title: e.target.title, price: e.target.value },
            ]);
          }}
        >
          Add To Card
        </Button>
      </Card.Body>
    </Card>
  );
}
