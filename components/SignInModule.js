import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { LocationContext } from "../context/LocationContext";

export default function SignInModule() {
  const { setSignInModule, setSignUpModule } = useContext(LocationContext);
  const [show, setShow] = useState(true);

  return (
    <Container>
      <Modal
        onExit={(e) => {
          setSignInModule(false);
          setSignUpModule(false);
        }}
        show={show}
        onHide={() => setShow(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        centered
      >
        <Modal.Header className="" closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setLocation(e.target.location.value);
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" required name="email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" required name="password" />
            </Form.Group>
            <p>
              Don't have an account!{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSignInModule(false);
                  setSignUpModule(true);
                }}
              >
                Register here
              </a>
            </p>
            <Button type="submit" variant="primary" className="mt-2">
              Sign in!
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
