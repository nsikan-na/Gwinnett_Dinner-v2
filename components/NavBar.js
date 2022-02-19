import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { LocationContext } from "../context/LocationContext";

export default function NavBar() {
  const { setSignInModule } = useContext(LocationContext);
  return (
    <Container className="sticky top-0 z-50 mx-auto bg-white">
      <Navbar expand="lg" className=" w-full ">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#menu">Menu</Nav.Link>
              <Nav.Link href="#">Location</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        <a
          variant="primary"
          className=""
          href='#'
          onClick={((e)=>{
            e.preventDefault()
            setSignInModule(true)})}
        >
          Login
        </a>
        </Container>
      </Navbar>
    </Container>
  );
}
