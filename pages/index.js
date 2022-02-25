import React, { useContext } from "react";

import LocationPortal from "../components/Modules/LocationModule";
import LandingPage from "../components/LandingPage";
import SignUpModule from "../components/Modules/SignUpModule";
import SignInModule from "../components/Modules/SignInModule";
import SideModule from "../components/Modules/SideModule";
import ComboModule from "../components/Modules/ComboModule";
import CartModule from "../components/Modules/CartModule";
import GuestModule from "../components/Modules/GuestModule";
import DeliveryModule from "../components/Modules/DeliveryModule";
import StripeModule from "../components/Modules/StripeModule";
import ReviewModule from "../components/Modules/ReviewModule";

import { Context } from "../context";

export default function Home() {
  const {
    location,
    signInModule,
    signUpModule,
    sideModule,
    comboModule,
    cartModule,
    guestModule,
    deliveryModule,
    stripeModule,
    reviewModule,
  } = useContext(Context);

  return (
    <>
      {!location ? <LocationPortal /> : ""}
      {signInModule ? <SignInModule /> : ""}
      {signUpModule ? <SignUpModule /> : ""}
      {comboModule ? <ComboModule /> : ""}
      {sideModule ? <SideModule /> : ""}
      {cartModule ? <CartModule /> : ""}
      {guestModule ? <GuestModule /> : ""}
      {deliveryModule ? <DeliveryModule /> : ""}
      {stripeModule ? <StripeModule /> : ""}
      {reviewModule ? <ReviewModule /> : ""}
      <LandingPage />
    </>
  );
}
