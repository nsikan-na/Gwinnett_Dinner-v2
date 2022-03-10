import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Context } from "../context";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import LandingPage from "../components/LandingPage";
import { locationData } from "../data/locations";
import Image from "next/image";

export default function Location() {
  const [spinner, setSpinner] = useState(false);
  const { setLocation } = useContext(Context);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    setShow(true);
  }, []);
  async function locationFormHandler(e) {
    setSpinner(true);
    const response = await fetch("api/location", {
      method: "POST",
      body: JSON.stringify({ location: e.target.location.value }),
      header: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setSpinner(false);
    if (!data.success) {
      return setError(data.message);
    }
    setLocation(e.target.location.value);
    router.push("/");
  }
  return (
    <>
      <Container>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          backdrop="static"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          centered
        >
          <Modal.Header className="">
            <Modal.Title className="text-red-600 w-full">
              <div className="flex justify-between">
                <h2 className="text-xl">Welcome to Gwinnett Diner!</h2>
                <div className="">
                  <Image
                    src="/images/cfa.png"
                    width="50%"
                    height="30%"
                    alt="logo"
                    className=""

                  />
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container className="">
              <div className=" md:flex md:pb-3 md:w-9/12 md:mx-auto md:justify-center">
                <Image
                  src="/images/gwinnett-diner.jpg"
                  width="400%"
                  height="400%"
                  alt="gwinnett dinner pic"
                  className="rounded-xl"
                />
              </div>
              <div className="md:w-10/12 md:flex md:mx-auto indent-10 ">
                Gwinnett Diner was built in 1975 and has been a staple in the
                community ever since. Our menu offers something for everybody.
                Whether you're ordering a multi-course meal or grabbing a drink
                with a burger and fries at the bar. Gwinnett Diner's lively,
                casual yet upscale atmosphere makes it perfect for dining with
                friends, family, clients, and business associates.
              </div>
            </Container>
            <Container className="flex justify-center">
              <Form
                onChange={() => {
                  setError("");
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  locationFormHandler(e);
                }}
              >
                <h5 className="text-red-600 mt-4">Please choose a location</h5>
                {locationData.map((location) => {
                  return (
                    <Container key={location.title}>
                      <Form.Check
                        inline
                        name="location"
                        type="radio"
                        id={`${location.title}`}
                        value={`${location.title}`}
                      />
                      <Form.Label htmlFor={`${location.title}`}>
                        {location.title}
                      </Form.Label>
                    </Container>
                  );
                })}

                {error ? (
                  <div className="text-red-600 text-center">{error}</div>
                ) : (
                  ""
                )}
                <div className="flex justify-center">
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
                    <Button
                      type="submit"
                      variant="primary"
                      className="mt-2"
                      style={{ backgroundColor: "red", border: "0px" }}
                    >
                      I live here
                    </Button>
                  )}
                </div>
              </Form>
            </Container>
          </Modal.Body>
        </Modal>
        <LandingPage />
      </Container>
    </>
  );
}
