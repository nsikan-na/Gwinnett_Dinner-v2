import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Context } from "../../context";

export default function StripeModule() {
  const { stripeModule, setStripeModule, setReviewModule } =
    useContext(Context);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <>
      <Modal
        show={show}
        centered
        backdrop="static"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        onHide={() => {
          setStripeModule(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Stripe Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            onClick={() => {
              setReviewModule(true);
              setStripeModule(false);
            }}
          >
            Success
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
