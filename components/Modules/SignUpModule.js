import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Context } from "../../context";

export default function SignUpModule() {
  const { setSignInModule, setSignUpModule } = useContext(Context);
  const [show, setShow] = useState(true);

  return (
    <Container>
      <Modal
        onExit={() => {
          setSignInModule(false);
          setSignUpModule(false);
        }}
        show={show}
        onHide={() => setShow(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        centered
      >
        <Modal.Header className="" closeButton>
          <Modal.Title>Create An Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setSignUpModule(false);
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirmPassword" />
            </Form.Group>
            <p>
              Already have an account!{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSignInModule(true);
                  setSignUpModule(false);
                }}
              >
                Sign In!
              </a>
            </p>
            <Button type="submit" variant="primary" className="mt-2">
              Sign Up!
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
