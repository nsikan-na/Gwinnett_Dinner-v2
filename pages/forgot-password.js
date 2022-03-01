import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Context } from "../context";

export default function ForgotPassword() {
  const router = useRouter();
  const { setAlertText, setUsername } = useContext(Context);
  const [show, setShow] = useState(true);
  const [error, setError] = useState("");
  async function resetLoginHandler(e) {
    const response = await fetch(`/api/forgot-password`, {
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
    if (!data.success) return setError(data.message);
    setUsername(e.target.username.value);
    router.push("/");
    setAlertText(`Password Reset! Welcome ${e.target.username.value}!`);
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
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onChange={() => {
              setError("");
            }}
            onSubmit={(e) => {
              e.preventDefault();
              resetLoginHandler(e);
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
              Remember password and username?{" "}
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
            <p>
              Create a new account? {" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/sign-up");
                }}
              >
                Sign Up!
              </a>
            </p>
            {error ? <div className="text-red-600">{error}</div> : ""}
            <Button type="submit" variant="primary" className="mt-2">
              Reset Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
