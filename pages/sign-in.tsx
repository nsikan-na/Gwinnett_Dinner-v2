import React from "react";
import { useRouter } from "next/router";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import SignInForm from "../components/SignInForm";
import LandingPage from "../components/LandingPage";

export default function SignIn() {
  const router = useRouter();

  return (
    <Container>
      <Modal
        onExit={() => {
          router.push("/");
        }}
        show={true}
        onHide={() => router.push("/")}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        centered
      >
        <Modal.Header className="" closeButton>
          <Modal.Title className="text-red-600">Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignInForm from="LandingPage" />
        </Modal.Body>
      </Modal>
      <LandingPage />
    </Container>
  );
}
