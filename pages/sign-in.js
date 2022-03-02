import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Context } from "../context";
import SignInForm from "../components/SignInForm";
import LandingPage from "../components/LandingPage";



export default function SignIn() {
  const router = useRouter();
  const {} = useContext(Context);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Container>
      <Modal
        onExit={(e) => {
          router.push("/");
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
          <SignInForm from="LandingPage" />
        </Modal.Body>
      </Modal>
      <LandingPage />

    </Container>
  );
}
