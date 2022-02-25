import React, { useContext, useState } from "react";
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
  variants,
}) {
  const { setActiveItem, setComboModule, setSideModule } = useContext(Context);
  const [viewDesc, setViewDesc] = useState(false);
  return (
    <Card
      className="w-72 my-2"
      onMouseEnter={(e) => {
        e.preventDefault();
        setViewDesc(true);
      }}
      onMouseLeave={(e) => {
        e.preventDefault();
        setViewDesc(false);
      }}
    >
      <Card.Img
        variant="top"
        src={`/images/${img}`}
        style={{ maxHeight: "300%" }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>${price}</Card.Text>
        {/* <p className="lg:hidden">{desc}</p> */}
        {/* {viewDesc ? <p className="hidden lg:block">{desc}</p> : ""} */}
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
              variants: e.target.variants.value,
            });
          }}
        >
          <input hidden value={title} name="title" readOnly />
          <input hidden value={price} name="price" readOnly />
          <input hidden value={desc} name="desc" readOnly />
          <input hidden value={img} name="img" readOnly />
          <input hidden value={location} name="location" readOnly />
          <input hidden value={type} name="type" readOnly />
          <input hidden value={sides} name="sides" readOnly />
          <input hidden value={variants} name="variants" readOnly />

          <Button type="submit" variant="primary">
            Add To Cart
          </Button>
        </form>
      </Card.Body>
    </Card>
  );
}
