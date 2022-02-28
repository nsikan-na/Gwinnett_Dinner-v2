import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Context } from "../context";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AlertSuccess from "./AlertSuccess";
export default function NavBar() {
  const {
    setSignInModule,
    setSignUpModule,
    setCart,
    setCartModule,
    setLocation,
    showAlert,
    username,
    setAlertText,
    setShowAlert,
    setUsername,
  } = useContext(Context);
  return (
    <Container className="sticky top-0 z-50 mx-auto ">
      <Container className="bg-white">
        <Navbar expand="lg" className=" w-full ">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="">
                <Nav.Link href="#combos">Combos</Nav.Link>
                <Nav.Link href="#sides">Sides</Nav.Link>
                <Nav.Link href="#desserts">Desserts</Nav.Link>
                <Nav.Link
                  href="#"
                  onClick={() => {
                    setLocation("");
                    setCart([]);
                  }}
                >
                  Change Location
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            {!username ? (
              <>
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
              </>
            ) : (
              <>
                <p
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="mr-4"
                >
                  Welcome {username}!
                </p>
                <Breadcrumb className="">
                  <Breadcrumb.Item
                    className=""
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setUsername("");
                      setShowAlert(true);
                      setAlertText(`You are now Signed Out!`);
                    }}
                  >
                    Sign Out
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
              </>
            )}
          </Container>
        </Navbar>
      </Container>

      {showAlert ? (
        <div className="mt-6">
          <AlertSuccess />
        </div>
      ) : (
        ""
      )}
    </Container>
  );
}
