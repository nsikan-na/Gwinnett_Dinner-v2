import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Context } from "../../context";

export default function StripeModule() {
  const { stripeModule, setStripeModule } = useContext(Context);

  return (
    <>
      <Modal
        show={stripeModule}
        fullscreen={true}
        onHide={() => {
          setStripeModule(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Stripe Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </>
  );
}
