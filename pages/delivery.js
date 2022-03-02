import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { Context } from "../context";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { locationData } from "./api/data";
import LandingPage from "../components/LandingPage";
import Spinner from "react-bootstrap/Spinner";

export default function Delivery() {
  const router = useRouter();
  const { setPayment, runningTotal, location } = useContext(Context);
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(null);
  const [paymentForm, setPaymentForm] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(false);

  async function deliveryHandler(e) {
    setSpinner(true);
    const locationZipCodes = locationData.filter((loc) => {
      return loc.title == location;
    });
    const response = await fetch(`/api/delivery`, {
      method: "POST",
      body: JSON.stringify({
        zipCode: e.target.zipCode.value,
        locationZipCodes: locationZipCodes[0].postalCodes,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setSpinner(false);
    if (!data.success) return setError(data.message);
    router.push("/card-payment");
  }
  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    if (showForm == null) return;
    if (showForm) {
      return setPayment({ method: "Delivery" });
    } else {
      setPayment({ method: "Pick-Up" });
    }
    if (paymentForm == null) return;
    if (paymentForm) return setPayment({ method: "Pick-Up", type: "Card" });
    else return setPayment({ method: "Pick-Up", type: "Cash" });
  }, [showForm, paymentForm, setPayment]);
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
          <Modal.Title>Method Options-${runningTotal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="text-center">Delivery Method</h5>

          <p
            className={`text-center ${
              location != "Mountain Park" ? "block" : "hidden"
            }`}
          >
            ($6 delivery fee)
          </p>

          <p
            className={`text-center text-red-600  ${
              location == "Mountain Park" ? "block" : "hidden"
            }`}
          >
            Mountain Park delivery option coming soon!
          </p>

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
            {location !== "Mountain Park" ? (
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
            ) : (
              ""
            )}
          </Form>
          <Form
            className={`${showForm ? "block" : "hidden"}`}
            onChange={() => {
              setError("");
            }}
            onSubmit={(e) => {
              e.preventDefault();
              deliveryHandler(e);
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

              <Form.Group
                as={Col}
              >
                <Form.Label>Zip</Form.Label>

                <Form.Control name="zipCode" />
              </Form.Group>
            </Row>
            {error ? <div className="text-red-600">{error}</div> : ""}
            {spinner ? (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Continue to Payment
              </Button>
            )}
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
                router.push("/review-order");
              } else {
                router.push("/card-payment");
              }
            }}
          >
            <h5>Payment Method</h5>
            <Container className="flex justify-evenly">
              {["Cash", "Card"].map((type) => (
                <span key={type}>
                  <Form.Label htmlFor={type}>{type}</Form.Label>
                  <Form.Check
                    inline
                    name="paymentMethod"
                    type="radio"
                    id={type}
                    value={type}
                    className="mx-2"
                  />
                </span>
              ))}
            </Container>
            <div className={`${paymentForm == null ? "hidden" : "block"}`}>
              {!paymentForm ? (
                <Button variant="primary" type="submit">
                  Submit Order
                </Button>
              ) : (
                <Button variant="primary" type="submit">
                  Continue to Payment
                </Button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <LandingPage />
    </Container>
  );
}
