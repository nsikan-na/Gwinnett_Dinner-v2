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
  const [subtotal, setSubtotal] = useState(0);
  const [preTax, setPreTax] = useState(0);
  useEffect(() => {
    if (location) return;
    setTimeout(() => {
      router.push("/location");
    }, 750);
  }, [location]);

  useEffect(() => {
    if (cart.length === 0) return setRunningTotal(0);

    const sub = cart
      .reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2);
    setSubtotal(sub);
    const discount = username ? (0.97 * sub).toFixed(2) : (1 * sub).toFixed(2);
    const deliveryFee =
      payment.method === "Delivery" ? 6 + +discount : 0 + +discount;
      setPreTax(deliveryFee);
    const tax = (deliveryFee * 1.06).toFixed(2);
    setRunningTotal(tax);
    console.log(sub, discount, deliveryFee, tax);
  }, [cart, setRunningTotal, payment, username]);

  useEffect(() => {}, [runningTotal]);
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
        subtotal,
        setSubtotal,
        preTax,
        setPreTax,
      }}
    >
      <Component {...pageProps} />
    </Context.Provider>
  );
}

export default MyApp;
