import React, { useContext } from "react";
import { useRouter } from "next/router";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { Context } from "../context";
import AlertSuccess from "./AlertSuccess";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
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
      <Container className="sticky bg-gray-50 top-0 z-50 mx-auto lg:hidden flex justify-between ">
        <MenuIcon
          className="scale-125  text-red-600 cursor-pointer link my-3"
          onClick={() => {
            router.push("/nav");
          }}
        />
        <Image
          src="/images/cfa.png"
          width="100%"
          height="10%"
          alt="logo"
          className="scale-50 cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        />
        <div className="my-3">
          <ShoppingCartIcon
            className="text-red-600 cursor-pointer"
            onClick={() => {
              router.push("/cart");
            }}
          />
        </div>
      </Container>
      <Container className="sticky top-0 z-50 mx-auto  ">
        <Container className="bg-gray-50 hidden lg:block py-2">
          <Container className="flex items-center justify-between">
            <div className="space-x-5 z-20">
              <a
                style={{ color: "red" }}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                }}
                className="cursor-pointer"
              >
                Our Menu
              </a>
              <a
                style={{ color: "red" }}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  // router.push("/about");
                }}
              >
                About Us
              </a>
              <a
                style={{ color: "red" }}
                href="#"
                onClick={() => {
                  router.push("/location");
                  setCart([]);
                }}
              >
                Change Location
              </a>
            </div>
            <div className="absolute flex w-11/12 justify-center ">
              <Image
                src="/images/cfa.png"
                width="100%"
                height="60%"
                alt="logo"
                className="scale-50 z-20 cursor-pointer"
                onClick={() => {
                  router.push("/");
                }}
              />
            </div>
            <div className="space-x-5 z-20">
              {!username ? (
                <>
                  <a
                    style={{ color: "red" }}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/sign-up");
                    }}
                  >
                    Sign Up
                  </a>
                  <a
                    style={{ color: "red" }}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/sign-in");
                    }}
                  >
                    Sign In
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="#"
                    style={{ color: "black" }}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className=""
                  >
                    Welcome {username}!
                  </a>
                  <a
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
                  </a>
                </>
              )}
              <ShoppingCartIcon
                className="text-red-600 cursor-pointer"
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
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
