import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { Context } from "../context";
import Spinner from "react-bootstrap/Spinner";
import Image from "next/image";
export default function MenuCards({ title, price, desc, img, type, local }) {
  const router = useRouter();
  const { cardSpinner, setCardSpinner } = useContext(Context);
  const [viewDesc, setViewDesc] = useState(false);
  return (
    <>
      <Card className="w-72 my-2" id={title}>
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
        
          <Image
            alt={title}
            width="300%"
            height="300%"
            variant="top"
            src={`/images/${img}`}
          />
        </div>
        <Card.Body>
          <div className="flex justify-between">
            <Card.Title className="text-red-600">{title}</Card.Title>
          </div>
          <Card.Text>${price}</Card.Text>
          <p >{desc}</p>

          <Link type="submit" className="" href={`/menu/${title}`} passHref>
            {cardSpinner ? (
              <Button
                variant="primary"
                disabled
                style={{ backgroundColor: "red", border: "0px" }}
              >
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </Button>
            ) : (
              <Button
                className="myButton"
                style={{ backgroundColor: "red", border: "0" }}
                onClick={() => {
                  setCardSpinner(true);
                }}
              >
                Add To Cart
              </Button>
            )}
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
