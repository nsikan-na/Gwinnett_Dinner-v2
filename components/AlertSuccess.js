import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Alert from "react-bootstrap/Alert";
import { Context } from "../context";

export default function AlertSuccess() {
  const router = useRouter();
  const { alertText, alertLink, setAlertLink,setAlertText, setCartModule } =
    useContext(Context);
  useEffect(() => {
    if (!alertText) return;
    setTimeout(() => {
      setAlertText("");
      setAlertLink(false);
    }, 4500);
  }, [alertText,setAlertLink,setAlertText]);
  return (
    <Alert
      className=" top-20 z-20 absolute w-11/12 md:w-max mx-auto text-white text-center"
      style={{ backgroundColor: "green", border: "0px" }}
    >
      {`${alertText} `}
      {alertLink ? (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            router.push("/cart");
          }}
          className="alertLink"
          style={{}}
        >
          View Cart
        </a>
      ) : (
        ""
      )}
    </Alert>
  );
}
