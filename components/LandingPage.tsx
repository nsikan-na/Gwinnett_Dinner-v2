import React from "react";
import NavBar from "./NavBar";
import Menu from "./Menu";
import Footer from "./Footer";

import Container from "react-bootstrap/Container";

export default function Home() {
  return (
    <Container>
      <NavBar />
      <Menu />
      <Footer />
    </Container>
  );
}
