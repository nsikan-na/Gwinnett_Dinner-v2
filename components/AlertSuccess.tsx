import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Alert from "react-bootstrap/Alert";
import { Context } from "../context";

export default function AlertSuccess() {
  const router = useRouter();
  const { alertText, alertLink, setAlertLink, setAlertText }: any =
    useContext(Context);
  useEffect(() => {
    if (!alertText) return;
    setTimeout(() => {
      //alert appears for 4.5 seconds
      setAlertText("");
      setAlertLink(false);
    }, 4500);
  }, [alertText, setAlertLink, setAlertText]);
  return (
    <Alert
      className="top-16 lg:top-2 z-20 absolute w-11/12 md:w-max mx-auto text-white text-center"
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
