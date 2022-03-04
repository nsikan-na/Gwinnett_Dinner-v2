import React, { useContext } from "react";
import { useRouter } from "next/router";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Context } from "../context";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AlertSuccess from "./AlertSuccess";
export default function NavBar() {
  const router = useRouter();
  const {
    setSignInModule,
    setSignUpModule,
    setCart,
    setLocation,
    username,
    setAlertText,
    alertText,
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
                <Nav.Link
                  href="#"
                  onCLick={() => {
                    e.preventDefault();
                    router.push("/");
                  }}
                >
                  Menu
                </Nav.Link>
                {!username ? (
                  <>
                    <Nav.Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push("/sign-up");
                      }}
                    >
                      Sign Up
                    </Nav.Link>
                    <Nav.Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push("/sign-in");
                      }}
                    >
                      Sign In
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link
                      className=""
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setUsername("");
                        setAlertText(`You have signed out!`);
                      }}
                    >
                      Sign Out
                    </Nav.Link>{" "}
                  </>
                )}
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
              <></>
            ) : (
              <p
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="mr-4"
              >
                Welcome {username}!
              </p>
            )}
          </Container>
        </Navbar>
      </Container>

      {alertText ? (
        <div className="mt-6">
          <AlertSuccess />
        </div>
      ) : (
        ""
      )}
    </Container>
  );
}
