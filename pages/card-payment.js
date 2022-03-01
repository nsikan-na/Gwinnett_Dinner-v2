import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Context } from "../context";
import Form from "react-bootstrap/Form";
export default function CardPayment() {
  const router = useRouter();
  const { runningTotal } = useContext(Context);
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
          router.push("/");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Card Payment-${runningTotal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/");
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Card Information</Form.Label>
              <Form.Control
                type="text"
                name="cardNum"
                placeholder="1234 1234 1234 1234"
              />
              <div className="flex">
                <Form.Control
                  type="text"
                  name="expireDate"
                  placeholder="MM/YY"
                  className="w-6/12"
                />
                <Form.Control
                  type="text"
                  name="cvc"
                  placeholder="CVC"
                  className="w-6/12"
                />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name on card</Form.Label>
              <Form.Control type="text" name="name" />
            </Form.Group>
            <Button
              className="mt-3"
              onClick={() => {
                router.push("/review-order");
              }}
            >
              Pay ${runningTotal}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
