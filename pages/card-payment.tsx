import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Context } from "../context";
import Form from "react-bootstrap/Form";
import LandingPage from "../components/LandingPage";
import Spinner from "react-bootstrap/Spinner";
export default function CardPayment() {
  const router = useRouter();
  const { runningTotal }: any = useContext(Context);

  //manage loading state
  const [spinner, setSpinner] = useState<boolean>(false);

  //manage error state
  const [error, setError] = useState<string>("");

  async function cardPaymentHandler(e: any) {
    //handle card form
    setSpinner(true);
    const response = await fetch(`/api/card-payment`, {
      method: "POST",
      body: JSON.stringify({
        cardName: e.target.cardName.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setSpinner(false);
    if (!data.success) return setError(data.message);
    router.push("/review-order");
  }
  return (
    <>
      <Modal
        show={true}
        centered
        backdrop="static"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        onHide={() => {
          router.push("/");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Card Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              cardPaymentHandler(e);
            }}
            onChange={() => {
              setError("");
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Card Information</Form.Label>
              <Form.Control
                className="bg-white"
                type="text"
                name="cardNum"
                value="4242 4242 4242 4242"
                readOnly
              />
              <div className="flex">
                <Form.Control
                  className="bg-white w-6/1"
                  type="text"
                  name="expireDate"
                  value="04/24"
                  readOnly
                />
                <Form.Control
                  className="bg-white w-6/12"
                  type="text"
                  name="cvc"
                  value="242"
                  readOnly
                />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name on card</Form.Label>
              <Form.Control type="text" name="cardName" />
            </Form.Group>
            {error ? (
              <div className="text-red-600 text-center my-3">{error}</div>
            ) : (
              ""
            )}
            {spinner ? (
              <Button
                variant="primary"
                disabled
                style={{ backgroundColor: "red", border: "0px" }}
              >
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
              <div className="flex justify-around items-center">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    router.back();
                  }}
                  className="link text-red-600 no-underline"
                  style={{ color: "red" }}
                >
                  Back
                </a>
                <Button
                  type="submit"
                  style={{ backgroundColor: "red", border: "0px" }}
                  className="mt-2 myButton"
                >
                  Pay ${runningTotal}
                </Button>
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>
      <LandingPage />
    </>
  );
}
