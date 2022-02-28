import React, { useContext, useEffect } from "react";
const db = require("./api/db");
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

export default function Home({queryUserData}) {
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
      {signInModule ? <SignInModule data={queryUserData}/> : ""}
      {signUpModule ? <SignUpModule /> : ""}
      {comboModule ? <ComboModule /> : ""}
      {sideModule ? <SideModule /> : ""}
      {cartModule ? <CartModule /> : ""}
      {guestModule ? <GuestModule data={queryUserData}/> : ""}
      {deliveryModule ? <DeliveryModule /> : ""}
      {stripeModule ? <StripeModule /> : ""}
      {reviewModule ? <ReviewModule /> : ""}
      <LandingPage />
    </>
  );
}
export async function getServerSideProps() {
  const query = await db.execute(`SELECT * FROM user_data`);
  const queryUserData = query[0];
  return { props: { queryUserData }};
}
