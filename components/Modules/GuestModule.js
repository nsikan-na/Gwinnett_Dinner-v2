import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { Context } from "../../context";
import Form from "react-bootstrap/Form";
import SignInForm from "../Forms/SignInForm";

export default function SignInModule() {
  const { setGuestModule, setSignInModule, setDeliveryModule } =
    useContext(Context);
  const [showForm, setShowForm] = useState(null);
  const [show, setShow] = useState(true);

  return (
    <Container>
      <Modal
        onExit={() => {
          setGuestModule(false);
        }}
        show={show}
        backdrop="static"
        onHide={() => setShow(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        centered
      >
        <Modal.Header className="" closeButton>
          <Modal.Title> Sign In for 3% Discount</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
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
              <Form.Label htmlFor="Guest">Continue as Guest</Form.Label>
              <Form.Check
                inline
                name="loginStatus"
                type="radio"
                id="Guest"
                value="Guest"
                className="mx-2"
              />
            </span>
            <span>
              <Form.Label htmlFor="Sign In">Sign In</Form.Label>
              <Form.Check
                inline
                name="loginStatus"
                type="radio"
                id="Sign In"
                value="Sign In"
                className="mx-2"
              />
            </span>
          </Form>
          {showForm ? <SignInForm from="GuestModule" /> : ""}
          {!showForm && showForm != null ? (
            <Container className="flex justify-center pt-3">
              <Button
                variant="primary"
                onClick={() => {
                  setGuestModule(false);
                  setDeliveryModule(true);
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
    </Container>
  );
}
