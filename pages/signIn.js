import React, { useState, useContext, useEffect } from "react";
import db from "./api/db";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Context } from "../context";
import SignInForm from "../components/SignInForm";

export default function SignInModule({ queryUserData }) {
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
          <SignInForm from="LandingPage" data={queryUserData} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}
export async function getServerSideProps() {
  const query = await db.execute(`SELECT * FROM user_data`);
  const queryUserData = query[0];
  return { props: { queryUserData } };
}
