import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { Context } from "../../context";

export default function SignInModule() {
  const { setGuestModule, setSignInModule, setDeliveryModule } =
    useContext(Context);
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
          <Modal.Title>Check Out</Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-evenly flex">
          <Button
            variant="primary"
            onClick={() => {
              setGuestModule(false);
              setDeliveryModule(true);
            }}
          >
            Continue as Guest
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setSignInModule(true);
              setGuestModule(false);
            }}
          >
            Login for 3% Discount
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
