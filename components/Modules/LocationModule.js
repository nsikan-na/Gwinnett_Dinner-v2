import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Context } from "../../context";

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
            <Form.Check
              inline
              name="location"
              type="radio"
              id="Snellville"
              value="Snellville"
            />
            <Form.Label htmlFor="Snellville">Snellville</Form.Label>
            <br />
            <Form.Check
              inline
              name="location"
              type="radio"
              id="Peachtree Corners"
              value="Peachtree Corners"
            />
            <Form.Label htmlFor="Peachtree Corners">
              Peachtree Corners
            </Form.Label>
            <br />
            <Form.Check
              inline
              name="location"
              type="radio"
              id="Lawrenceville"
              value="Lawrenceville"
            />
            <Form.Label htmlFor="Lawrenceville">Lawrenceville</Form.Label>
            <br />
            <Form.Check
              inline
              name="location"
              type="radio"
              id="Mountain Park"
              value="Mountain Park"
            />
            <Form.Label htmlFor="Mountain Park">Mountain Park</Form.Label>
            <br />
            <Button type="submit" variant="primary" className="mt-2">
              I live here
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
