import React from "react";
import NavBar from "./NavBar";
import Menu from "./Menu";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";

export default function LandingPage() {
  return (
    <Container>
      <NavBar />
      <Container className="bg-gray-50 ">
        <Menu />
      </Container>
      <Footer />
    </Container>
  );
}
