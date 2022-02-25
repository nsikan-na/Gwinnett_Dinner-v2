import React, { useState, useContext, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { Context } from "../context";

export default function AlertSuccess() {
  const {
    showAlert,
    setShowAlert,
    alertText,
    alertLink,
    setAlertLink,
    setCartModule,
  } = useContext(Context);
  useEffect(() => {
    if (!showAlert) return;
    setTimeout(() => {
      setShowAlert(false);
      setAlertLink(false);
    }, 4500);
  }, [showAlert]);
  return (
    <Alert
      className=" w-11/12 md:w-max mx-auto text-white text-center"
      style={{ backgroundColor: "green", border: "0px" }}
    >
      {`${alertText} `}
      {alertLink ? (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCartModule(true);
          }}
          className="alertLink"
          style={{  }}
        >
          View Cart
        </a>
      ) : (
        ""
      )}
    </Alert>
  );
}
