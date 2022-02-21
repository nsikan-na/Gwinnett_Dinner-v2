import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { Context } from "../../context";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function SignInModule() {
  const {
    setDeliveryModule,
    setStripeModule,
    setReviewModule,
    setPayment,
    payment,
  } = useContext(Context);
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(null);
  const [paymentForm, setPaymentForm] = useState(null);
  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    if (showForm == null) return;
    if (showForm) return setPayment({ method: "Delivery", });
    if (paymentForm == null) return;
    if (paymentForm) return setPayment({ method: "Pick-Up", type: "Card" });
    else return setPayment({ method: "Pick-Up", type: "Cash" });
  }, [showForm, paymentForm, setPayment]);
  return (
    <Container>
      <Modal
        onExit={() => {
          setDeliveryModule(false);
        }}
        show={show}
        backdrop="static"
        onHide={() => setShow(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        centered
      >
        <Modal.Header className="" closeButton>
          <Modal.Title>Delivery Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="justify-evenly flex"
            onChange={(e) => {
              if (e.target.value === "Pickup") {
                setShowForm(false);
              } else {
                setShowForm(true);
              }
            }}
          >
            <span>
              <Form.Label htmlFor="pickup">Pick-Up</Form.Label>
              <Form.Check
                inline
                name="deliveryMethod"
                type="radio"
                id="pickup"
                value="Pickup"
                className="mx-2"
              />
            </span>
            <span>
              <Form.Label htmlFor="Delivery">Delivery</Form.Label>
              <Form.Check
                inline
                name="deliveryMethod"
                type="radio"
                id="Delivery"
                value="Delivery"
                className="mx-2"
              />
            </span>
          </Form>
          <Form
            className={`${showForm ? "block" : "hidden"}`}
            onSubmit={(e) => {
              e.preventDefault();
              setStripeModule(true);
              setDeliveryModule(false);
            }}
          >
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Continue to Payment
            </Button>
          </Form>
          <Form
            className={`${
              !showForm && showForm != null ? "block" : "hidden"
            } text-center`}
            onChange={(e) => {
              e.target.value === "Cash"
                ? setPaymentForm(false)
                : setPaymentForm(true);
            }}
            onSubmit={(e) => {
              e.preventDefault();
              if (!paymentForm) {
                setDeliveryModule(false);
                setReviewModule(true);
              } else {
                setStripeModule(true);
                setDeliveryModule(false);
              }
            }}
          >
            <h5>Payment Method</h5>
            <Container className="flex justify-evenly">
              <span>
                <Form.Label htmlFor="Cash">Cash</Form.Label>
                <Form.Check
                  inline
                  name="paymentMethod"
                  type="radio"
                  id="Cash"
                  value="Cash"
                  className="mx-2"
                />
              </span>
              <span>
                <Form.Label htmlFor="Card">Card</Form.Label>
                <Form.Check
                  inline
                  name="paymentMethod"
                  type="radio"
                  id="Card"
                  value="Card"
                  className="mx-2"
                />
              </span>
            </Container>

            <div className={`${paymentForm == null ? "hidden" : "block"}`}>
              <Button variant="primary" type="submit">
                {`${!paymentForm ? "Submit Order" : "Continue to Payment"}`}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
