import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import { Context } from "../context";
function MyApp({ Component, pageProps }) {
  const [location, setLocation] = useState("");
  const [signInModule, setSignInModule] = useState(false);
  const [signUpModule, setSignUpModule] = useState(false);
  const [runningTotal, setRunningTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [activeCombo, setActiveCombo] = useState("");
  const [activeItem, setActiveItem] = useState({});
  const [comboModule, setComboModule] = useState(false);
  const [sideModule, setSideModule] = useState(false);
  const [cartModule, setCartModule] = useState(false);
  const [guestModule, setGuestModule] = useState(false);
  const [deliveryModule, setDeliveryModule] = useState(false);
  const [stripeModule, setStripeModule] = useState(false);
  const [reviewModule, setReviewModule] = useState(false);
  const [payment, setPayment] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertLink, setAlertLink] = useState(false);
  useEffect(() => {
    if (cart.length === 0) return setRunningTotal(0);
    const deliveryFee = payment.method === "Delivery" ? 6 : 0;
    setRunningTotal(
      Intl.NumberFormat().format(
        cart.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0) *
          1.06 +
          deliveryFee
      )
    );
  }, [cart, setRunningTotal, payment]);
  return (
    <Context.Provider
      value={{
        location,
        setLocation,
        signInModule,
        setSignInModule,
        signUpModule,
        setSignUpModule,
        runningTotal,
        setRunningTotal,
        cart,
        setCart,
        sideModule,
        setSideModule,
        activeCombo,
        setActiveCombo,
        activeItem,
        setActiveItem,
        comboModule,
        setComboModule,
        cartModule,
        setCartModule,
        guestModule,
        setGuestModule,
        deliveryModule,
        setDeliveryModule,
        stripeModule,
        setStripeModule,
        reviewModule,
        setReviewModule,
        payment,
        setPayment,
        showAlert,
        setShowAlert,
        alertText,
        setAlertText,
        alertLink,
        setAlertLink,
      }}
    >
      <Component {...pageProps} />
    </Context.Provider>
  );
}

export default MyApp;
