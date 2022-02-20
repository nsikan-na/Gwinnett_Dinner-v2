import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Context } from "../../context";

export default function ReviewModule() {
  const { setReviewModule, setCart } = useContext(Context);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
    setCart([]);
  }, []);
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        onExit={() => {
          setReviewModule(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Review Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thank you for your Order</Modal.Body>
      </Modal>
    </>
  );
}
