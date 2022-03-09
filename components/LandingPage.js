import React, { useContext } from "react";
import NavBar from "./NavBar";
import Menu from "./Menu";
import Footer from "./Footer";

import Container from "react-bootstrap/Container";

export default function Home() {
  return (
    <Container className="">
      <NavBar />
      <div className="">
        <Menu />
      </div>
      <Footer />
    </Container>
  );
}
