import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Context } from "../../context";
import SignInForm from "../Forms/SignInForm";

export default function SignInModule({data}) {
  const { setSignInModule, setSignUpModule } = useContext(Context);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
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
          <SignInForm from="LandingPage" data={data} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}
