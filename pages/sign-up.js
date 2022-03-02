import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Context } from "../context";
import LandingPage from "../components/LandingPage";

export default function SignUp() {
  const router = useRouter();
  const { setAlertText, setUsername } = useContext(Context);
  const [show, setShow] = useState(true);
  const [error, setError] = useState("");
  async function signUpHandler(e) {
    const response = await fetch(`/api/sign-up`, {
      method: "POST",
      body: JSON.stringify(JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value,
      })),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
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
          <Modal.Title>Create An Account</Modal.Title>
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
            <Button type="submit" variant="primary" className="mt-2">
              Sign Up!
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <LandingPage />
    </Container>
  );
}
