import React, { useContext } from "react";
import { useRouter } from "next/router";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
import { Context } from "../context";
import Navbar from "react-bootstrap/Navbar";
import CloseIcon from "@mui/icons-material/Close";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
export default function MobileNav() {
  const router = useRouter();
  const { username, setUsername, setAlertText } = useContext(Context);
  return (
    <Container>
      <Modal show={true} fullscreen={true} onHide={() => router.push("/")}>
        <Modal.Header className="pt-2 mb-1">
          <Modal.Title>
            <CloseIcon
              className="text-red-600 cursor-pointer link"
              onClick={() => router.push("/")}
            />
            <Nav className=" flex flex-col pt-4 space-y-14 pb-10">
              <Link href="/">
                <div className="text-red-600 text-2xl font-semibold cursor-pointer link">
                  Our Menu
                </div>
              </Link>
              <Link href="#">
                <div className="text-red-600 text-2xl font-semibold cursor-pointer link">
                  About Us
                </div>
              </Link>
              <Link
                href="/location"
                onClick={() => {
                  router.push("/location");
                  setCart([]);
                }}
              >
                <div className="text-red-600 text-2xl font-semibold cursor-pointer link">
                  {" "}
                  Change Location
                </div>
              </Link>
            </Nav>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pl-4">
          <Nav className={`${!username ? "flex space-x-14" : "flex flex-col space-y-4"}`}>
            {!username ? (
              <>
                <Link href="/sign-up">
                  <div className="text-red-600 text-2xl font-semibold cursor-pointer link">
                    Sign Up
                  </div>
                </Link>
                <Link href="/sign-in">
                  <div className="text-red-600 text-2xl font-semibold cursor-pointer link">
                    Sign In
                  </div>
                </Link>
              </>
            ) : (
              <>

                <div
                  className="text-red-600 text-2xl font-semibold cursor-pointer link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setUsername("");
                    setAlertText(`You have signed out!`);
                  }}
                >
                  Sign Out
                </div>
              </>
            )}
          </Nav>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
