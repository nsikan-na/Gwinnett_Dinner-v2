import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import { Context } from "../context";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "react-bootstrap/Button";

export default function Footer() {
  const { location, runningTotal, cart, setCartModule } = useContext(Context);
  const router = useRouter();
  return (
    <Container className="text-center sticky bottom-0 bg-gray-50 py-2">
      {cart.length !== 0 ? (
        <div className="flex justify-center items-center space-x-10">
          <h5>Total-${runningTotal}</h5>
          <Button
            style={{ backgroundColor: "red", border: "0px" }}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // setCartModule(true);
              router.push("/cart");
            }}
          >
           <ShoppingCartIcon/>
          </Button>
        </div>
      ) : (
        <div className="mt-1">
          <h6 className="">
            Gwinnett Dinner {location ? `@ ${location}` : ""}
          </h6>
        </div>
      )}
    </Container>
  );
}
