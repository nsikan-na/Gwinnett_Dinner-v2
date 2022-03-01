import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function MenuCards({
  title,
  price,
  desc,
  img,
  type,
}) {
  const router = useRouter();
  const [viewDesc, setViewDesc] = useState(false);
  return (
    <Card className="w-72 my-2">
      <div
        className="relative flex "
        onMouseEnter={(e) => {
          e.preventDefault();
          setViewDesc(true);
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          setViewDesc(false);
        }}
      >
        {viewDesc ? (
          <div className="hidden lg:flex pl-8 items-center absolute bg-gray-100 bg-opacity-50 w-full h-full text-xl ">
            {desc}
          </div>
        ) : (
          ""
        )}
        <Card.Img
          variant="top"
          src={`/images/${img}`}
          style={{ maxHeight: "300%" }}
        />
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>${price}</Card.Text>
        <p className="lg:hidden">{desc}</p>

          <Button
            type="submit"
            variant="primary"
            onClick={() => {
              router.push(`/menu/${title}#${type}`);
            }}
          >
            Add To Cart
          </Button>
      </Card.Body>
    </Card>
  );
}
