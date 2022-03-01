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
              onSubmit={(e) => {
                e.preventDefault();
                if (!e.target.location.value)
                  return setError("Please select a location");
                setLocation(e.target.location.value);
                router.push("/");
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
              {error ? (
                <div className="text-red-600">Please select a location.</div>
              ) : (
                ""
              )}
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
