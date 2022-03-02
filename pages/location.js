import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Context } from "../context";
import { locationData } from "./api/data";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import LandingPage from "../components/LandingPage";

export default function Location() {
  const { setLocation } = useContext(Context);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    setShow(true);
  }, []);
  async function locationFormHandler(e) {
    const response = await fetch("api/location", {
      method: "POST",
      body: JSON.stringify({ location: e.target.location.value }),
      header: { "Content-Type": "application/json" },
    });
    const data = await response.json();
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
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          centered
        >
          <Modal.Header className="">
            <Modal.Title>Choose A Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onChange={() => {
                setError("");
              }}
              onSubmit={(e) => {
                e.preventDefault();
                locationFormHandler(e);
              }}
            >
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
              {error ? <div className="text-red-600">{error}</div> : ""}
              <Button type="submit" variant="primary" className="mt-2">
                I live here
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <LandingPage />
      </Container>
    </>
  );
}
