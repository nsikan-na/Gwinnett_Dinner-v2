import React, { useState } from "react";
import LocationPortal from "./LocationPortal";
import LandingPage from "./LandingPage";
import { LocationContext } from "../context/LocationContext";

export default function Main() {
  const [location, setLocation] = useState("");
  return (
    <>
      <LocationContext.Provider
        value={{
          location,
          setLocation,
        }}
      >
        {!location ? <LocationPortal /> : ""}
        <LandingPage />
      </LocationContext.Provider>
    </>
  );
}
