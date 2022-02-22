import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Context } from "../../context";
import { locationData } from "../../data/locationData";

export default function LocationModule() {
  const { setLocation } = useContext(Context);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  return (
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
              setLocation(e.target.location.value);
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
            <Button type="submit" variant="primary" className="mt-2">
              I live here
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
