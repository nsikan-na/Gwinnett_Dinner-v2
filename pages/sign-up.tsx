import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Context } from "../context";
import LandingPage from "../components/LandingPage";
import Spinner from "react-bootstrap/Spinner";

export default function SignUp() {
  const router = useRouter();
  const { setAlertText, setUsername } = useContext(Context);
  const [show, setShow] = useState(true);
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(false);

  async function signUpHandler(e) {
    setSpinner(true);

    const response = await fetch(`/api/sign-up`, {
      method: "POST",
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setSpinner(false);
    if (!data.success) return setError(data.message);
    setUsername(e.target.username.value);
    router.push("/");
    setAlertText(`Account Created! Welcome ${e.target.username.value}!`);
  }
  return (
    <Container>
      <Modal
        onExit={() => {
          router.push("/");
        }}
        show={show}
        onHide={() => setShow(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        centered
      >
        <Modal.Header className="" closeButton>
          <Modal.Title className="text-red-600">Create An Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onChange={() => {
              setError("");
            }}
            onSubmit={(e) => {
              e.preventDefault();
              signUpHandler(e);
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
                className="link text-red-600"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/sign-in");
                }}
              >
                Sign In!
              </a>
            </p>
            {error ? <div className="text-red-600">{error}</div> : ""}
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
                className="mt-2 myButton"
                style={{ backgroundColor: "red", border: "0px" }}
              >
                Sign Up!
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
      <LandingPage />
    </Container>
  );
}
