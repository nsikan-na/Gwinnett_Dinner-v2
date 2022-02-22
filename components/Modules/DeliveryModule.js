import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { Context } from "../../context";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { locationData } from "../../data/locationData";
import { menuItems } from "../../data/menuItems";

export default function SignInModule() {
  const {
    setDeliveryModule,
    setStripeModule,
    setReviewModule,
    setPayment,
    runningTotal,
    location,
  } = useContext(Context);
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(null);
  const [paymentForm, setPaymentForm] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [validPostal, setValidPostal] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  let locationZipCodes;
  locationData.forEach((item) => {
    if (item.title === location) {
      locationZipCodes = item.postalCodes.toString();
    }
  });
  useEffect(() => {
    setShow(true);
  }, []);
  useEffect(() => {
    if (!postalCode) {
      return setValidPostal(false);
    }
    setFormSubmit(false);
    setValidPostal(false);
    if (postalCode.length < 5) {
      return setValidPostal(false);
    }
    const valid = locationData
      .filter((loc) => {
        return loc.title === location ? loc.postalCodes : "";
      })[0]
      .postalCodes.some((code) => {
        return code == postalCode;
      });
    if (valid) {
      setValidPostal(false);
    } else {
      setValidPostal(true);
    }
  }, [postalCode]);

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
          setDeliveryModule(false);
        }}
        show={show}
        backdrop="static"
        onHide={() => setShow(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        centered
      >
        <Modal.Header className="" closeButton>
          <Modal.Title>Delivery Method-${runningTotal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            onSubmit={(e) => {
              e.preventDefault();
              setFormSubmit(true);
              if (validPostal) return;
              if (!postalCode || postalCode.length != 5) return;
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

              <Form.Group
                as={Col}
                controlId="formGridZip"
                onChange={(e) => {
                  setPostalCode(e.target.value);
                }}
                value={postalCode}
              >
                <Form.Label>Zip</Form.Label>
                <Form.Control />
              </Form.Group>
            </Row>
            <p className={`text-red-600 ${!validPostal ? "hidden" : "block"}`}>
              {`The ${location} branch only delivers to 
                ${locationZipCodes}
              .`}
            </p>
            <p
              className={`text-red-600 ${
                !validPostal && formSubmit ? "block" : "hidden"
              }`}
            >
              Please enter valid zip code!
            </p>
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
