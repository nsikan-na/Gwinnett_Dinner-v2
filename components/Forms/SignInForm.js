import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Context } from "../../context";

export default function SignInForm({ from }) {
  const {
    setDeliveryModule,
    setSignInModule,
    setGuestModule,
    setSignUpModule,
  } = useContext(Context);
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setSignInModule(false);
        if (from === "GuestModule") {
          setGuestModule(false);
          setDeliveryModule(true);
        }
      }}
    >
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="email" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" name="password" />
      </Form.Group>

      {from !== "GuestModule" ? (
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
            Register here!
          </a>{" "}
        </p>
      ) : (
        ""
      )}

      <Button type="submit" variant="primary" className="mt-2">
        Sign in!
      </Button>
    </Form>
  );
}
