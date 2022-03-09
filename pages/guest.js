import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { Context } from "../context";
import Form from "react-bootstrap/Form";
import SignInForm from "../components/SignInForm";
import LandingPage from "../components/LandingPage";

export default function Guest() {
  const router = useRouter();
  const { runningTotal } = useContext(Context);
  const [showForm, setShowForm] = useState(null);
  const [show, setShow] = useState(true);

  return (
    <Container>
      <Modal
        onExit={() => {
          router.push("/");
        }}
        show={show}
        backdrop="static"
        onHide={() => setShow(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        centered
      >
        <Modal.Header className="" closeButton>
          <Modal.Title>Sign In for Discount</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <p className="text-center">(3% discount if you Sign In!)</p>
          <Form
            className="justify-evenly flex"
            onChange={(e) => {
              if (e.target.value === "Sign In") {
                setShowForm(true);
              } else {
                setShowForm(false);
              }
            }}
          >
            <span>
              <Form.Label htmlFor="Guest" className="cursor-pointer">
                Continue as Guest
              </Form.Label>
              <Form.Check
                inline
                name="loginStatus"
                type="radio"
                id="Guest"
                value="Guest"
                className="mx-2 cursor-pointer"
              />
            </span>
            <span>
              <Form.Label htmlFor="Sign In" className="cursor-pointer">
                Sign In
              </Form.Label>
              <Form.Check
                inline
                name="loginStatus"
                type="radio"
                id="Sign In"
                value="Sign In"
                className="mx-2 cursor-pointer"
              />
            </span>
          </Form>
          {showForm == null ? (
            <div className="flex items-center justify-around">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/cart");
                }}
                className="link text-red-600 no-underline"
                style={{ color: "red" }}
              >
                Back
              </a>
              <div></div>
            </div>
          ) : (
            ""
          )}
          {showForm ? <SignInForm from="GuestModule" /> : ""}
          {!showForm && showForm != null ? (
            <Container className=" pt-3 flex justify-around items-center ">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/cart");
                }}
                className="link text-red-600 no-underline"
                style={{ color: "red" }}
              >
                Back
              </a>
              <Button
                className="myButton"
                style={{ backgroundColor: "red", border: "0px" }}
                variant="primary"
                onClick={() => {
                  router.push("/delivery");
                }}
              >
                Proceed To CheckOut
              </Button>
            </Container>
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
      <LandingPage />
    </Container>
  );
}
