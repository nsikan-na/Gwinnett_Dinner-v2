import React, { useState } from "react";
import LocationPortal from "./Modules/LocationModule";
import LandingPage from "./LandingPage";
import SignUpModule from "./Modules/SignUpModule";
import SignInModule from "./Modules/SignInModule";
import { Context } from "../context";
import SideModule from "./Modules/SideModule";
import ComboModule from "./Modules/ComboModule";
import CartModule from "./Modules/CartModule";
import SSRProvider from "react-bootstrap/SSRProvider";
import GuestModule from "./Modules/GuestModule";
import DeliveryModule from "./Modules/DeliveryModule";
import StripeModule from "./Modules/StripeModule";
import ReviewModule from "./Modules/ReviewModule";

export default function Main() {
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

  return (
    <SSRProvider>
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
        }}
      >
        {!location ? <LocationPortal /> : ""}
        {signInModule === true ? <SignInModule /> : ""}
        {signUpModule === true ? <SignUpModule /> : ""}
        {comboModule === true ? <ComboModule /> : ""}
        {sideModule === true ? <SideModule /> : ""}
        {cartModule === true ? <CartModule /> : ""}
        {guestModule === true ? <GuestModule /> : ""}
        {deliveryModule === true ? <DeliveryModule /> : ""}
        {stripeModule === true ? <StripeModule /> : ""}
        {reviewModule === true ? <ReviewModule /> : ""}
        <LandingPage />
      </Context.Provider>
    </SSRProvider>
  );
}
