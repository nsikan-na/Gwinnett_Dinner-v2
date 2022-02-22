import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Context } from "../context";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function NavBar() {
  const { setSignInModule, setSignUpModule, setCartModule } =
    useContext(Context);
  return (
    <Container className="sticky top-0 z-50 mx-auto bg-white">
      <Navbar expand="lg" className=" w-full ">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Menu</Nav.Link>
              {/* <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  // setLocation("");
                }}
              >
                Location
              </Nav.Link>
              <Nav.Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                About
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
          <Breadcrumb className="">
            <Breadcrumb.Item
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSignUpModule(true);
              }}
            >
              Sign Up
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className=""
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSignInModule(true);
              }}
            >
              Sign In
            </Breadcrumb.Item>
            <Breadcrumb.Item
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCartModule(true);
              }}
            >
              <ShoppingCartIcon className="" />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </Navbar>
    </Container>
  );
}
