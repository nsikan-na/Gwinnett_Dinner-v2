import React, { useContext, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { Context } from "../context";
export default function AlertSuccess() {

  const { alertText,  setAlertText }: any =
    useContext(Context);
  useEffect(() => {
    if (!alertText) return;
    setTimeout(() => {
      //alert appears for 4.5 seconds
      setAlertText("");
    }, 4500);
  }, [alertText, setAlertText]);
  return (
    <Alert
      className="top-16 lg:top-2 z-20 absolute w-11/12 md:w-max mx-auto text-white text-center"
      style={{ backgroundColor: "green", border: "0px" }}
    >
      {`${alertText} `}
    </Alert>
  );
}
