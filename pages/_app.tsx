import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Context } from "../context";
import type { AppProps } from "next/app";
export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, []);
  const [location, setLocation] = useState<string>("Snellville");

  // stores for the cart
  const [cart, setCart] = useState<[]>([]);

  // stores for the final cost
  const [runningTotal, setRunningTotal] = useState<number>(0);

  // stores for payment method
  const [payment, setPayment] = useState<{ method: string; type: string }>({
    method: "Pick-Up",
    type: "Cash",
  });

  // stores for the username
  const [username, setUsername] = useState<string>("");

  // stores the text in an alert
  const [alertText, setAlertText] = useState<string>("");


  // stores whether to show a spinner for the add to cart button
  const [cardSpinner, setCardSpinner] = useState<boolean>(false);

  // store the subtotal
  const [subtotal, setSubtotal] = useState<number>(0);

  // store the final cost but without tax
  const [preTax, setPreTax] = useState<number>(0);

  // stores the tip value
  const [tip, setTip] = useState<number>(0);

  useEffect(() => {
    // update the store based every time cart, runningTotal, payment, username, tip is change
    if (cart.length === 0) return setRunningTotal(0);

    //add the items together
    const sub: number = Number(
      cart
        .reduce((total: number, item: { price: number; quantity: number }) => {
          return total + item.price * item.quantity;
        }, 0)
        .toFixed(2)
    );
    setSubtotal(sub);

    //calculate 3% discount
    const discount: number = username
      ? +(0.97 * sub).toFixed(2)
      : +(1 * sub).toFixed(2);

    //calculate deliveryFee
    const deliveryFee: number =
      payment.method === "Delivery" ? 6 + discount : 0 + discount;

    //calculate subtotal before tax
    setPreTax(+deliveryFee.toFixed(2));

    //calculate the tax
    const tax: number = +(deliveryFee * 1.06 + Number(tip)).toFixed(2);

    //calculate the total
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
