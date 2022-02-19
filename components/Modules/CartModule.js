import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { Context } from "../../context";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function SignInModule() {
  const { cart, runningTotal, setCartModule, setCart, setGuestModule } =
    useContext(Context);
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
                      <Col className="flex justify-around ">
                        <form
                          action="#"
                          method="POST"
                          onSubmit={(e) => {
                            e.preventDefault();
                            setCart(
                              cart.filter((item) => {
                                return item === cart[e.target.index.value]
                                  ? cart[e.target.index.value].quantity++
                                  : item;
                              })
                            );
                          }}
                        >
                          <input
                            type="hidden"
                            name="index"
                            value={index}
                            readOnly
                          />
                          <button>
                            <AddIcon
                              className="cursor-pointer"
                              onClick={() => {}}
                              type="submit"
                            />
                          </button>
                        </form>
                        {item.quantity}
                        <form
                          action="#"
                          method="POST"
                          onSubmit={(e) => {
                            e.preventDefault();
                            console.log(cart[e.target.index.value].quantity);
                            if (cart[e.target.index.value].quantity == 1) {
                              setCart(
                                cart.filter((item) => {
                                  return item !== cart[e.target.index.value];
                                })
                              );
                              return;
                            }
                            setCart(
                              cart.filter((item) => {
                                return item === cart[e.target.index.value]
                                  ? cart[e.target.index.value].quantity--
                                  : item;
                              })
                            );
                          }}
                        >
                          <input
                            type="hidden"
                            name="index"
                            value={index}
                            readOnly
                          />
                          <button>
                            <RemoveIcon
                              className="cursor-pointer"
                              onClick={() => {}}
                              type="submit"
                            />
                          </button>
                        </form>
                      </Col>
                      <Col className="text-center">
                        ${item.price * item.quantity}
                      </Col>
                      <Col className="text-center">
                        <form
                          action="#"
                          method="POST"
                          onSubmit={(e) => {
                            e.preventDefault();
                            setCart(
                              cart.filter((item) => {
                                return item !== cart[e.target.index.value];
                              })
                            );
                          }}
                        >
                          <input
                            type="hidden"
                            name="index"
                            value={index}
                            readOnly
                          />
                          <button>
                            <CloseIcon
                              type="submit"
                              className="cursor-pointer"
                            />
                          </button>
                        </form>
                      </Col>
                    </Row>
                  );
                })}
              </Container>
              <h4>${runningTotal}</h4>
              <Button
                className=""
                variant="primary"
                onClick={() => {
                  setCartModule(false);
                  setGuestModule(true);
                }}
              >
                Proceed to Checkout
              </Button>
            </Container>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
