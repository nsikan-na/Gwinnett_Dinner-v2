import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import { Context } from "../context";
import type { AppProps } from "next/app";
export default function MyApp({ Component, pageProps }: AppProps) {


  const [location, setLocation] = useState<string>("Snellville");

  // stores for the cart
  const [cart, setCart] = useState<{}[]>([]);

  // stores for the final cost
  const [runningTotal, setRunningTotal] = useState<number>(0);

  // stores for payment method
  const [payment, setPayment] = useState<[]>([]);

  // stores for the username
  const [username, setUsername] = useState<string>("");

  // stores the text in an alert
  const [alertText, setAlertText] = useState<string>("");

  //stores whether a link is in an alert
  const [alertLink, setAlertLink] = useState<boolean>(false);

  // stores whether to show a spinner for the add to cart button
  const [cardSpinner, setCardSpinner] = useState<boolean>(false);

  // store the subtotal
  const [subtotal, setSubtotal] = useState<number>(0);

  // store the final cost but without tax
  const [preTax, setPreTax] = useState<number>(0);

  // stores the tip value
  const [tip, setTip] = useState<number>(0);

  useEffect(() => {
    // update the store based everytime cart, runningTotal, payment, username, tip is change
    if (cart.length === 0) return setRunningTotal(0);

    const sub: number = cart
      .reduce((total: number, item: { price: number; quantity: number }) => {
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2);
    setSubtotal(sub);
    const discount = username ? (0.97 * sub).toFixed(2) : (1 * sub).toFixed(2);
    const deliveryFee =
      payment.method === "Delivery" ? 6 + +discount : 0 + +discount;
    setPreTax(deliveryFee.toFixed(2));
    const tax = (deliveryFee * 1.06 + Number(tip)).toFixed(2);
    setRunningTotal(tax);
  }, [cart, setRunningTotal, payment, username, tip]);

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
        tip,
        setTip,
      }}
    >
      <Component {...pageProps} />
    </Context.Provider>
  );
}
