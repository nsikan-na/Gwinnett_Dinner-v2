import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Context } from "../context";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import LandingPage from "../components/LandingPage";
import { locationData } from "../data/locations";
import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import { menuItems } from "../data/menuItems";
export default function Location({ menuItems }) {
  const [spinner, setSpinner] = useState(false);
  const { setLocation } = useContext(Context);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    setShow(true);
  }, []);
  const carouselItems = menuItems.filter((item) => {
    return item.location == "all" && item.type == "combo";
  });
  async function locationFormHandler(e) {
    setSpinner(true);
    const response = await fetch("api/location", {
      method: "POST",
      body: JSON.stringify({ location: e.target.location.value }),
      header: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setSpinner(false);
    if (!data.success) {
      return setError(data.message);
    }
    setLocation(e.target.location.value);
    router.push("/");
  }
  return (
    <>
      <Container>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          backdrop="static"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          centered
        >
          <Modal.Header className="">
            <Modal.Title className="text-red-600 w-full">
              <div className="flex justify-between items-center">
                <h2 className="text-base md:text-xl">
                  Welcome to Gwinnett Diner!
                </h2>
                <div className="">
                  <Image
                    src="/images/logo.jpg"
                    width="40%"
                    height="50%"
                    alt="logo"
                    className=""
                  />
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container className="">
              <div className=" md:flex md:pb-3 md:w-9/12 md:mx-auto md:justify-center">
                <Carousel fade>
                  {carouselItems.map((item) => (
                    <Carousel.Item key={item.title} interval={5000}>
                      <Image
                        src={`/images/gray-${item.img}`}
                        alt={item.title}
                        className="rounded-xl"
                        width="400%"
                        height="400%"
                      />

                      <Carousel.Caption className="text-white font-semibold rounded-xl text-lg">
                        {/* <div className="">{item.title}</div> */}
                        <p className="">{item.desc}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>

            </Container>
            <Container className="flex justify-center">
              <Form
                onChange={() => {
                  setError("");
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  locationFormHandler(e);
                }}
              >
                <h5 className="text-red-600 mt-4">Please choose a location</h5>
                {locationData.map((location) => {
                  return (
                    <Container key={location.title}>
                      <Form.Check
                        inline
                        name="location"
                        type="radio"
                        id={`${location.title}`}
                        value={`${location.title}`}
                      />
                      <Form.Label htmlFor={`${location.title}`}>
                        {location.title}
                      </Form.Label>
                    </Container>
                  );
                })}

                {error ? (
                  <div className="text-red-600 text-center">{error}</div>
                ) : (
                  ""
                )}
                <div className="flex justify-center">
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
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      className="mt-2"
                      style={{ backgroundColor: "red", border: "0px" }}
                    >
                     Choose this location!
                    </Button>
                  )}
                </div>
              </Form>
            </Container>
          </Modal.Body>
        </Modal>
        <LandingPage />
      </Container>
    </>
  );
}
export async function getServerSideProps() {
  return {
    props: { menuItems },
  };
}
