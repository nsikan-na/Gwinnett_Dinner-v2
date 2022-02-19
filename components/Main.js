import React, { useState } from "react";
import LocationPortal from "./LocationModule";
import LandingPage from "./LandingPage";
import SignUpModule from "./SignUpModule";
import SignInModule from "./SignInModule";
import { LocationContext } from "../context/LocationContext";
import SideModule from "./SideModule";
import ComboModule from "./ComboModule";
import CartModule from "./CartModule";
import SSRProvider from "react-bootstrap/SSRProvider";

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

  return (
    <SSRProvider>
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
        }}
      >
        {/* {!location ? <LocationPortal /> : ""} */}
        {signInModule === true ? <SignInModule /> : ""}
        {signUpModule === true ? <SignUpModule /> : ""}
        {comboModule === true ? <ComboModule /> : ""}
        {sideModule === true ? <SideModule /> : ""}
        {cartModule === true ? <CartModule /> : ""}
        <LandingPage />
      </LocationContext.Provider>
    </SSRProvider>
  );
}
