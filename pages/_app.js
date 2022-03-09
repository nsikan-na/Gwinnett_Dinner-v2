import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [location, setLocation] = useState("");
  // const [location, setLocation] = useState("Lawrenceville");

  const [cart, setCart] = useState([]);
  const [runningTotal, setRunningTotal] = useState(0);
  const [payment, setPayment] = useState([]);
  const [username, setUsername] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertLink, setAlertLink] = useState(false);
  const [cardSpinner, setCardSpinner] = useState(false);

  useEffect(() => {
    if (location) return;
    setTimeout(() => {
      router.push("/location");
    }, 750);
  }, [location]);

  useEffect(() => {
    if (cart.length === 0) return setRunningTotal(0);
    const deliveryFee = payment.method === "Delivery" ? 6 : 0;
    const discount = username ? 0.97 : 1;
    setRunningTotal(
      (
        cart.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0) *
          discount *
          1.06 +
        deliveryFee
      ).toFixed(2)
    );
  }, [cart, setRunningTotal, payment, username]);

  return (
    <Context.Provider
      value={{
        location,
        setLocation,
        runningTotal,
        setRunningTotal,
        cart,
        setCart,
        payment,
        setPayment,
        alertText,
        setAlertText,
        alertLink,
        setAlertLink,
        username,
        setUsername,
        cardSpinner,
        setCardSpinner,
      }}
    >
      <Component {...pageProps} />
    </Context.Provider>
  );
}

export default MyApp;
