import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Context } from "../context";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import LandingPage from "../components/LandingPage";

export default function ReviewOrder() {
  const router = useRouter();
  const {
    setCart,
    cart,
    setRunningTotal,
    runningTotal,
    payment,
    setPayment,
    location,
    setAlertText,
    username,
    subtotal,
    preTax
  } = useContext(Context);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        backdrop="static"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        onExit={() => {
          router.push("/");
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Review Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Estimated Wait Time: 7 minutes</h6>
          <h6 className="">
            {payment.method == "Pick-Up" ? "Pick-Up at" : "Delivery from"}{" "}
            {location}
          </h6>
          <h6 className="">{`${
            payment.type != "Cash"
              ? `Paid with Card!`
              : "Paying with cash at store!"
          }`}</h6>

          <Container className="mt-3">
            {cart.map((item, index) => {
              return (
                <Row
                  key={index}
                  className="cartRow flex justify-center items-center"
                >
                  <Col className="md:flex justify-center">
                    <Image
                      alt={item.title}
                      src={`/images/${item.img}`}
                      width="100%"
                      height="100%"
                    />
                  </Col>
                  <Col>
                    <div className="text-center">
                      {item.sideItems ? (
                        <p key={index}>
                          {item.title.split("&")[0] +
                            "w/ " +
                            item.sideItems.toString().replace(",", " & ")}
                        </p>
                      ) : (
                        <p>{item.title}</p>
                      )}
                    </div>
                  </Col>
                  <Col className="flex justify-around ">{item.quantity}</Col>
                </Row>
              );
            })}
          </Container>
          <Container className="mt-3">
            <Row className="totalRow">
              <Col className=''>
                <h6>Items Total</h6>
              </Col>
              <Col className=''>
                <h6>${subtotal}</h6>
              </Col>
            </Row>

            {username ? (
              <Row className="totalRow">
                <Col className=''>
                  <h6>Signed in discount Applied (3%)</h6>
                </Col>
                <Col className=''>
                  <h6>-${(subtotal * 0.03).toFixed(2)}</h6>
                </Col>
              </Row>
            ) : (
              ""
            )}
            {payment.method == "Pick-Up" ? (
              ""
            ) : (
              <Row className="totalRow">
                <Col className=''>
                  <h6>Delivery Fee</h6>
                </Col>
                <Col className=''>
                  <h6>$6.00</h6>
                </Col>
              </Row>
            )}
            
            <Row className="totalRow">
              <Col className=''><h6>Subtotal</h6>
              </Col>
              <Col>
                <h6>${preTax}</h6>
              </Col>
            </Row>
            <Row className="totalRow">
              <Col className=''>
                <h6>Tax (6%)</h6>
              </Col>
              <Col>
                <h6>${(preTax * 0.06).toFixed(2)}</h6>
              </Col>
            </Row>
            <Row className="totalRow">
              <Col className=''>
                <h5>Total</h5>
              </Col>
              <Col className=''>
                <h5>${runningTotal}</h5>
              </Col>
            </Row>
            <div className="flex justify-around items-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.back();
                }}
                className="link text-red-600 no-underline"
                style={{ color: "red" }}
              >
                Back
              </a>
              <Button
                style={{ backgroundColor: "red", border: "0px" }}
                variant="primary"
                className="mt-3 myButton"
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                  setCart([]);
                  setPayment({});
                  setRunningTotal(0);
                  setAlertText(
                    `Thank You For Your Order! (7 minute wait time)`
                  );
                }}
              >
                Submit Order
              </Button>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
      <LandingPage />
    </>
  );
}
