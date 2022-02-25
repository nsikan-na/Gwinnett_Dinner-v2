import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Context } from "../../context";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";

export default function ReviewModule() {
  const {
    setReviewModule,
    setCart,
    cart,
    setRunningTotal,
    runningTotal,
    payment,
    setPayment,
    location,
    setDeliveryModule,
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
          setReviewModule(false);
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Review Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Estimated Wait Time: 15 minutes</h6>
          <h5>{location}</h5>
          <h5 className="inline">{payment.method} </h5>
          <h6 className="inline">{`${
            payment.type === "Card" ? `(Card)` : "(Cash)"
          }`}</h6>
          <h4>${runningTotal}</h4>
          <Container className="">
            {cart.map((item, index) => {
              return (
                <Row
                  key={index}
                  className="cartRow flex justify-center items-center"
                >
                  <Col className="md:flex justify-center">
                    <Image
                      src={`/images/${item.img}`}
                      width="200%"
                      height="130%"
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
            <Button
              variant="primary"
              className="mt-3"
              href=""
              onClick={(e) => {
                e.preventDefault();
                setCart([]);
                setPayment({});
                setRunningTotal(0);
                setReviewModule(false);
                setDeliveryModule(false);
              }}
            >
              Submit Order
            </Button>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
