import React from "react";
import NavBar from "./NavBar";
import HeroSection from "./HeroSection";
import Menu from "./Menu";
import RunningTotal from "./RunningTotal";
import About from "./About";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";

export default function LandingPage() {
  return (
    <Container>
      <NavBar />
      <HeroSection />
      <Menu />
      <RunningTotal />
      <About />
      <Footer />
    </Container>
  );
}
