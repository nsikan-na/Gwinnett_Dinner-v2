import React from "react";
import NavBar from "./NavBar";
import HeroSection from "./HeroSection";
import Menu from "./Menu";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";

export default function LandingPage() {
  return (
    <Container>
      <NavBar />
      {/* <HeroSection /> */}
      <Menu />
      <Footer />
    </Container>
  );
}
