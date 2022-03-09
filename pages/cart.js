import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { Context } from "../context";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LandingPage from "../components/LandingPage";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Cart() {
  const router = useRouter();
  const { cart, runningTotal, setCart, username } = useContext(Context);
  const [show, setShow] = useState(true);
  return (
    <Container>
      <Modal
        onExit={() => {
          router.push("/");
        }}
        show={show}
        onHide={() => setShow(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        centered
        size="xl"
      >
        <Modal.Header className="" closeButton>
          <Modal.Title>
            Shopping Cart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <h5>Your cart is empty!</h5>
          ) : (
            <Container>
              <h4>Subtotal-${runningTotal}</h4>
              <Container className="cart">
                {cart.map((item, index) => {
                  return (
                    <Row
                      key={index}
                      className="cartRow flex justify-center items-center"
                    >
                      <Col className="hidden md:flex justify-center">
                        <Image
                          alt={item.title}
                          src={`/images/${item.img}`}
                          width="100%"
                          height="100%"
                          className=""
                        />
                      </Col>
                      <Col>
                        <div className="text-center">
                          {item.sideItems ? (
                            <p key={index}>
                              {`${item.variant ? item.variant : ""} ${
                                item.title.split("&")[0]
                              }  w/ ${item.sideItems
                                .toString()
                                .replace(",", " & ")}`}
                            </p>
                          ) : (
                            <p>{item.title}</p>
                          )}
                        </div>
                      </Col>
                      <Col className="flex justify-around ">
                        <form
                          action="#"
                          method="POST"
                          onSubmit={(e) => {
                            e.preventDefault();
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
                            {item.quantity == 1 ? (
                              <DeleteIcon
                                className="cursor-pointer"
                                onClick={() => {}}
                                type="submit"
                              />
                            ) : (
                              <RemoveIcon
                                className="cursor-pointer"
                                onClick={() => {}}
                                type="submit"
                              />
                            )}
                          </button>
                        </form>

                        {item.quantity}
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
                      </Col>
                      <Col className="text-center hidden md:block">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Col>
                      <Col className="text-center hidden md:block">
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
              <Container className="flex justify-around items-center ">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/");
                  }}
                  className="link text-red-600  no-underline"
                  style={{ color: "red" }}
                >
                  Back to Menu
                </a>
                <div className="md:hidden">
                  <Button
                    style={{ backgroundColor: "red", border: "0px" }}
                    className="mt-2 "
                    variant="primary"
                    onClick={() => {
                      if (!username) {
                        router.push("/guest");
                      }
                      if (username) {
                        router.push("/delivery");
                      }
                    }}
                  >
                    Checkout
                  </Button>
                </div>
                <div className="hidden md:block">
                  <Button
                    style={{ backgroundColor: "red", border: "0px" }}
                    className="mt-2 myButton"
                    variant="primary"
                    onClick={() => {
                      if (!username) {
                        router.push("/guest");
                      }
                      if (username) {
                        router.push("/delivery");
                      }
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </Container>
            </Container>
          )}
        </Modal.Body>
      </Modal>
      <LandingPage />
    </Container>
  );
}
