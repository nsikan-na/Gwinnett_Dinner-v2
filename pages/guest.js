import React, { useState, useContext } from "react";
const db = require("./api/db");
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { Context } from "../context";
import Form from "react-bootstrap/Form";
import SignInForm from "../components/SignInForm";
export default function GuestModule({  queryUserData }) {
  const router = useRouter();
  const { runningTotal } = useContext(Context);
  const [showForm, setShowForm] = useState(null);
  const [show, setShow] = useState(true);

  return (
    <Container>
      <Modal
        onExit={() => {
          router.push("/");

        }}
        show={show}
        backdrop="static"
        onHide={() => setShow(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        centered
      >
        <Modal.Header className="" closeButton>
          <Modal.Title>Sign In for Discounts-${runningTotal}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <p className="text-center">(3% discount if you Sign In!)</p>
          <Form
            className="justify-evenly flex"
            onChange={(e) => {
              if (e.target.value === "Sign In") {
                setShowForm(true);
              } else {
                setShowForm(false);
              }
            }}
          >
            <span>
              <Form.Label htmlFor="Guest">Continue as Guest</Form.Label>
              <Form.Check
                inline
                name="loginStatus"
                type="radio"
                id="Guest"
                value="Guest"
                className="mx-2"
              />
            </span>
            <span>
              <Form.Label htmlFor="Sign In">Sign In</Form.Label>
              <Form.Check
                inline
                name="loginStatus"
                type="radio"
                id="Sign In"
                value="Sign In"
                className="mx-2"
              />
            </span>
          </Form>
          {showForm ? <SignInForm from="GuestModule" data={ queryUserData} /> : ""}
          {!showForm && showForm != null ? (
            <Container className="flex justify-center pt-3">
              <Button
                variant="primary"
                onClick={() => {

                  router.push("/delivery");
                }}
              >
                Proceed To CheckOut
              </Button>
            </Container>
          ) : (
            ""
          )}
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
  