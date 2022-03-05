import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "next/image";
export default function MenuCards({ title, price, desc, img, type, local }) {
  const router = useRouter();

  const [viewDesc, setViewDesc] = useState(false);
  return (
    <Card className="w-72 my-2">
      <div
        className="relative flex"
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
          alt={title}
          width="300%"
          height="300%"
          variant="top"
          src={`/images/${img}`}
        />
      </div>
      <Card.Body>
        <div className="flex justify-between">
          <Card.Title>{title}</Card.Title>
          {/* {local != "all" ? (
            <Image
              alt={`unique to ${local}`}
              src="/images/star.png"
              width="30%"
              height="30%"
              className=""
            />
          ) : (
            ""
          )} */}
        </div>
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
