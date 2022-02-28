import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Context } from "../context";
import Link from "next/link";
export default function SignInForm({ from, data }) {
  const router = useRouter();
  const { setAlertText, setUsername } = useContext(Context);
  const [error, setError] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  useEffect(() => {}, [error]);
  return (
    <Form
      onChange={() => {
        setError("");
      }}
      onSubmit={(e) => {
        e.preventDefault();
        if (!e.target.username.value || !e.target.password.value) {
          return setError("Please enter valid username and password!");
        }
        const validInputs = data.some((item) => {
          return (
            item.username == e.target.username.value &&
            item.password == e.target.password.value
          );
        });
        if (!validInputs) {
          setFailedLogin(true);
          return setError(
            "Username or password is incorrect! Please enter valid credentials!"
          );
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
            onClick={(e) => {
              e.preventDefault();
              router.push("/signUp");
            }}
          >
            Register here!
          </a>{" "}
        </p>
      ) : (
        ""
      )}
      <div className={`${error ? "block" : "hidden"} text-red-600`}>
        {error}
      </div>
      {failedLogin ? (
        <>
          <Link href="#" className="">
            Reset Password
          </Link>
          <br />
        </>
      ) : (
        ""
      )}
      <Button type="submit" variant="primary" className="mt-2">
        Sign in!
      </Button>
    </Form>
  );
}
