import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Context } from "../../context";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ReviewModule() {
  const { setReviewModule, setCart, cart, runningTotal, payment, setPayment } =
    useContext(Context);
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
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        onExit={() => {
          setCart([]);
          setPayment({});
          setReviewModule(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Completed! Thank you!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className='inline'>{payment.method} </h4>
          <h5 className='inline'>{`${payment.type === "Card" ? `(Card)` : "(Cash)"}`}</h5>
          <h3>${runningTotal}</h3>
          <Container className="">
            {cart.map((item, index) => {
              return (
                <Row key={index}>
                  <Col className="hidden md:block">
                    <Image
                      src={`/images/${item.img}`}
                      width="200%"
                      height="130%"
                    />
                  </Col>
                  <Col>
                    <div className="text-center">{item.title}</div>
                    <br />
                    <div className="text-center">
                      {item.sideItems
                        ? item.sideItems.map((side, index) => (
                            <p key={index}>{side}</p>
                          ))
                        : ``}
                    </div>
                  </Col>
                  <Col className="flex justify-around ">{item.quantity}</Col>
                </Row>
              );
            })}
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
