import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Context } from "../context";

export default function MenuCards({
  title,
  price,
  desc,
  img,
  type,
  location,
  sides,
}) {
  const { setActiveItem, setComboModule, setSideModule } =
    useContext(Context);
  return (
    <Card className="w-72 my-2">
      <Card.Img variant="top" src={`/images/${img}`} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>${price}</Card.Text>
        <Card.Text>{desc}</Card.Text>
        <form
          method="Post"
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
            if (e.target.type.value === "combo") {
              setComboModule(true);
            } else {
              setSideModule(true);
            }
            setActiveItem({
              title: e.target.title.value,
              price: e.target.price.value,
              desc: e.target.desc.value,
              img: e.target.img.value,
              location: e.target.location.value,
              type: e.target.type.value,
              sides: e.target.sides.value,
            });
          }}
        >
          <input hidden value={title} name="title" readOnly/>
          <input hidden value={price} name="price" readOnly/>
          <input hidden value={desc} name="desc" readOnly/>
          <input hidden value={img} name="img" readOnly/>
          <input hidden value={location} name="location" readOnly />
          <input hidden value={type} name="type" readOnly/>
          <input hidden value={sides}  name="sides" readOnly/>

          <Button type="submit" variant="primary">
            Add To Cart
          </Button>
        </form>
      </Card.Body>
    </Card>
  );
}
