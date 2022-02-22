import React from "react";
import NavBar from "./NavBar";
import HeroSection from "./HeroSection";
import Menu from "./Menu";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";
import About from "./About";

export default function LandingPage() {
  return (
    <Container>
      <NavBar />
      {/* <HeroSection /> */}
      <Container className="bg-gray-50 ">
        <Menu />
      </Container>
      <Footer />
      {/* <About/> */}
    </Container>
  );
}
