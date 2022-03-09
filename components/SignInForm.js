import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Context } from "../context";
import Spinner from "react-bootstrap/Spinner";

export default function SignInForm({ from }) {
  const router = useRouter();
  const { setAlertText, setUsername } = useContext(Context);
  const [error, setError] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);
  const [spinner, setSpinner] = useState(false);

  async function getUserData(e) {
    setSpinner(true);
    const response = await fetch("api/sign-in", {
      method: "POST",
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setSpinner(false);

    if (!data.success) {
      setError(data.message);
      if (data.showForget) {
        setFailedLogin(true);
      }
      return;
    }
    setUsername(e.target.username.value);
    if (from === "GuestModule") {
      router.push("/delivery");
    }
    if (from !== "GuestModule") {
      router.push("/");

      setAlertText(
        `Welcome ${e.target.username.value}! Enjoy your 3% discount!`
      );
    }
  }
  return (
    <Form
      onChange={() => {
        setError("");
      }}
      onSubmit={(e) => {
        e.preventDefault();
        getUserData(e);
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

      {from !== "GuestModule" ? (
        <p>
          Don't have an account!{" "}
          <a
            href="#"
            className="text-red-600 link"
            onClick={(e) => {
              e.preventDefault();
              router.push("/sign-up");
            }}
          >
            Register here!
          </a>{" "}
        </p>
      ) : (
        ""
      )}
      {failedLogin && from !== "GuestModule" ? (
        <>
          <a
            href="#"
            className="text-red-600 link"
            onClick={() => {
              router.push("/forgot-password");
            }}
          >
            Forgot Password
          </a>
          <br />
        </>
      ) : (
        ""
      )}
      <div
        className={`${error ? "block" : "hidden"} text-red-600 ${
          from == "GuestModule" ? "text-center" : ""
        }`}
      >
        {error}
      </div>
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
      ) : from !== "GuestModule" ? (
        <Button
          type="submit"
          variant="primary"
          className="mt-2 myButton"
          style={{ backgroundColor: "red", border: "0px" }}
        >
          Sign in!
        </Button>
      ) : (
        <div className="flex justify-around items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              router.push("/cart");
            }}
            className="link text-red-600 no-underline"
            style={{ color: "red" }}
          >
            Back
          </a>
          <Button
            type="submit"
            variant="primary"
            className="mt-2 myButton"
            style={{ backgroundColor: "red", border: "0px" }}
          >
            Sign in!
          </Button>
        </div>
      )}
    </Form>
  );
}
