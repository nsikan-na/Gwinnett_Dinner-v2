import React, { useState, useContext } from "react";
import LocationPortal from "./LocationModule";
import LandingPage from "./LandingPage";
import SignUpModule from "./SignUpModule";
import SignInModule from "./SignInModule";
import { LocationContext } from "../context/LocationContext";

export default function Main() {
  const [location, setLocation] = useState("");
  const [signInModule, setSignInModule] = useState(false);
  const [signUpModule, setSignUpModule] = useState(false);
  const [runningTotal, setRunningTotal] = useState(0);
  const [cart, setCart] = useState([]);
  return (
    <LocationContext.Provider
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
      }}
    >
      {!location ? <LocationPortal /> : ""}
      <LandingPage />
      {signInModule === true ? <SignInModule /> : ""}
      {signUpModule === true ? <SignUpModule /> : ""}
    </LocationContext.Provider>
  );
}
