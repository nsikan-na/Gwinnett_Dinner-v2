import React, { useContext } from "react";
import { useRouter } from "next/router";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { Context } from "../context";
import AlertSuccess from "./AlertSuccess";
import MenuIcon from "@mui/icons-material/Menu";
export default function NavBar() {
  const router = useRouter();
  const {
    setCart,
    setLocation,
    username,
    setAlertText,
    alertText,
    setUsername,
  } = useContext(Context);
  return (
    <>
      <Container className="sticky bg-gray-50 top-0 z-50 mx-auto lg:hidden">
        <MenuIcon
          className="scale-125 my-3 text-red-600 cursor-pointer link"
          onClick={() => {
            router.push("/nav");
          }}
        />
      </Container>
      <Container className="sticky top-0 z-50 mx-auto  ">
        <Container className="bg-gray-50 hidden lg:block">
          <Navbar expand="lg" className=" w-full ">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" className="" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="">
                  <Nav.Link
                    style={{ color: "red" }}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/");
                    }}
                  >
                    Our Menu
                  </Nav.Link>
                  <Nav.Link
                    style={{ color: "red" }}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      // router.push("/about");
                    }}
                  >
                    About Us
                  </Nav.Link>
                  <Nav.Link
                    style={{ color: "red" }}
                    href="#"
                    onClick={() => {
                      router.push("/location");
                      setCart([]);
                    }}
                  >
                    Change Location
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
              {!username ? (
                <>
                  <Nav.Link
                    style={{ color: "red" }}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/sign-up");
                    }}
                  >
                    Sign Up
                  </Nav.Link>
                  <Nav.Link
                    style={{ color: "red" }}
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
                    href="#"
                    style={{ color: "black" }}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="mr-4"
                  >
                    Welcome {username}!
                  </Nav.Link>
                  <Nav.Link
                    className=""
                    style={{ color: "red" }}
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

              {/* {!username ? (
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
              )} */}
            </Container>
          </Navbar>
        </Container>
        {alertText ? (
          <>
          <div className="pb-3">
              <AlertSuccess />
              </div>
          </>
        ) : (
          ""
        )}

      </Container>
    </>
  );
}
