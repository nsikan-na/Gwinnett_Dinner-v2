import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { LocationContext } from "../context/LocationContext";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function SignInModule() {
  const { cart, runningTotal, setCartModule } = useContext(LocationContext);
  const [show, setShow] = useState(true);

  return (
    <Container>
      <Modal
        onExit={(e) => {
          setCartModule(false);
        }}
        show={show}
        onHide={() => setShow(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        centered
        size="xl"
      >
        <Modal.Header className="" closeButton>
          <Modal.Title className="">
            <h1>Shopping Cart</h1>
            {cart.length !== 0 ? (
              <h5>
                {cart.length > 1
                  ? `${cart.length} items`
                  : `${cart.length} item`}
              </h5>
            ) : (
              ``
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <h5>Cart is empty!</h5>
          ) : (
            <Container>
              <Container>
                {cart.map((item, index) => {
                  return (
                    <Row key={index}>
                      <Col>
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
                      <Col>
                        <div>{item.quantity}</div>
                      </Col>
                      <Col>${item.price * item.quantity}</Col>
                      <Col>
                        <Image src="/images/x.png" width="30%" height="25%" />
                      </Col>
                    </Row>
                  );
                })}
              </Container>
              <h4>${runningTotal}</h4>
              <Button className="" variant="primary">
                Proceed to Checkout
              </Button>
            </Container>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
