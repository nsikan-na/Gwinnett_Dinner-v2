import React, { useState, useContext, useRef } from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import { Context } from "../../context";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
export default function ComboModule() {
  const {
    activeItem,
    setComboModule,
    setCart,
    cart,
    setShowAlert,
    setAlertText,
    setAlertLink,
  } = useContext(Context);
  const [show, setShow] = useState(true);
  const { title, desc, img, price, location, type, sides } = activeItem;
  const [quantity, setQuantity] = useState(1);
  const [doneError, setDoneError] = useState(false);
  const form = useRef();
  const [error, setError] = useState(false);
  const variants = activeItem.variants.split(",");
  return (
    <Container>
      <Modal
        onExit={() => {
          setComboModule(false);
        }}
        show={show}
        onHide={() => setShow(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        centered
      >
        <Modal.Header className="" closeButton>
          <Modal.Title>
            <h3 className="">{title}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Image src={`images/${img}`} className="mx-auto w-8/12" />
          <br />
          <h4>${price}</h4>
          <h5>Select quantity</h5>
          <Container className="flex justify-center items-center space-x-5">
            <Button
              variant="primary"
              className="bg-transparent"
              style={{ border: "0px" }}
              onClick={() => {
                if (quantity === 1) return;
                setQuantity(--quantity);
              }}
            >
              <RemoveIcon className="text-black" />
            </Button>
            <h5>{quantity}</h5>
            <Button
              variant="primary"
              className="bg-transparent"
              style={{ border: "0px" }}
              onClick={() => {
                setQuantity(++quantity);
              }}
            >
              <AddIcon className="text-black" />
            </Button>
          </Container>
          {sides != 0 ? (
            <Form
              method="post"
              ref={form}
              onChange={(e) => {
                if (e.target.name == "variants") {
                  setDoneError(false);
                }
                const checkboxes = [];
                form.current.side.forEach((item) => {
                  if (item.checked) checkboxes.push(item.checked);
                });
                if (checkboxes.length > sides) e.target.checked = false;
              }}
              onSubmit={(e) => {
                e.preventDefault();
                let variant;
                const checkboxes = [];
                form.current.side.forEach((item) => {
                  if (item.checked) checkboxes.push(item.checked);
                });
                if (e.target.variants && !e.target.variants.value) {
                  return setDoneError(true);
                } else {
                  variant = e.target.variants ? e.target.variants.value : "";
                }

                if (checkboxes.length != sides) return setError(true);
                let sideItems = [];
                e.target.side.forEach((item) => {
                  if (item.checked) {
                    sideItems.push(item.id);
                  }
                });
                //
                if (cart.length === 0) {
                  setCart((prevCart) => [
                    ...prevCart,
                    {
                      title,
                      desc,
                      img,
                      price,
                      location,
                      type,
                      sideItems,
                      quantity,
                      variant,
                    },
                  ]);
                } else {
                  if (cart.length != 0) {
                    if (title && sideItems && variant) {
                      if (
                        cart.some((item) => {
                          return (
                            item.title == title &&
                            item.sideItems.toString() == sideItems.toString() &&
                            item.variant == variant
                          );
                        })
                      ) {
                        const index = cart.findIndex((item) => {
                          return (
                            item.title == title &&
                            item.sideItems.toString() == sideItems.toString() &&
                            item.variant == variant
                          );
                        });
                        cart[index].quantity += quantity;
                        setCart((prevCart) => [...prevCart]);
                      } else {
                        setCart((prevCart) => [
                          ...prevCart,
                          {
                            title,
                            desc,
                            img,
                            price,
                            location,
                            type,
                            sideItems,
                            quantity,
                            variant,
                          },
                        ]);
                      }
                    }
                    if (title && sideItems && !variant) {
                      if (
                        cart.some((item) => {
                          return (
                            item.title == title &&
                            item.sideItems.toString() == sideItems.toString()
                          );
                        })
                      ) {
                        const index = cart.findIndex((item) => {
                          return (
                            item.title == title &&
                            item.sideItems.toString() == sideItems.toString()
                          );
                        });
                        cart[index].quantity += quantity;
                        setCart((prevCart) => [...prevCart]);
                      } else {
                        setCart((prevCart) => [
                          ...prevCart,
                          {
                            title,
                            desc,
                            img,
                            price,
                            location,
                            type,
                            sideItems,
                            quantity,
                            variant,
                          },
                        ]);
                      }
                    }
                  }
                }
                //
                setComboModule(false);
                setShowAlert(true);
                setAlertText(
                  `${variant ? variant : ""} ${
                    title.split("&")[0]
                  }  w/ ${sideItems
                    .toString()
                    .replace(",", " & ")} Added to Cart!`
                );
                setAlertLink(true);
              }}
            >
              {variants != "false" ? (
                <Container>
                  <h5>Select Degree</h5>
                  <table className="mx-auto">
                    {variants.map((variant) => {
                      return (
                        <Container key={variant} className="">
                          <tr>
                            <td>
                              <Form.Check
                                inline
                                name="variants"
                                type="radio"
                                id={`${variant}`}
                                value={`${variant}`}
                              />
                            </td>
                            <td>
                              <Form.Label htmlFor={`${variant}`}>
                                {variant}
                              </Form.Label>
                            </td>
                          </tr>
                        </Container>
                      );
                    })}
                  </table>
                  <h6
                    className={`text-red-500 ${doneError ? "block" : "hidden"}`}
                  >
                    You must enter a degree!
                  </h6>
                </Container>
              ) : (
                ""
              )}
              <h5>
                Pick {`${sides} ${sides > 1 ? "side items" : "side item"}`}
              </h5>
              <table className="mx-auto ">
                <tr>
                  <Form.Group className="">
                    <td>
                      <Form.Check
                        inline
                        name="side"
                        type="checkbox"
                        id="Fries"
                      />
                    </td>
                    <td>
                      <Form.Label htmlFor="Fries">Fries</Form.Label>
                    </td>
                  </Form.Group>
                </tr>
                <tr>
                  <Form.Group className=" ">
                    <td>
                      <Form.Check
                        inline
                        name="side"
                        type="checkbox"
                        id="Broccoli"
                      />
                    </td>
                    <td>
                      <Form.Label htmlFor="Broccoli">Broccoli</Form.Label>
                    </td>
                  </Form.Group>
                </tr>

                <tr>
                  <Form.Group className=" ">
                    <td>
                      <Form.Check
                        className=""
                        inline
                        name="side"
                        type="checkbox"
                        id="Garlic Pasta & Bread"
                      />
                    </td>
                    <td>
                      <Form.Label htmlFor="Garlic Pasta & Bread">
                        Pasta & Bread
                      </Form.Label>
                    </td>
                  </Form.Group>
                </tr>
              </table>
              <h6 className={`text-red-500 ${error ? "visible" : "invisible"}`}>
                You must enter {sides} sides!
              </h6>
              <Button className="" type="submit">
                Add to Cart
              </Button>
            </Form>
          ) : (
            <Button
              className=" mt-4"
              type="submit"
              onClick={() => {
                if (cart.length === 0) {
                  setCart((prevCart) => [
                    ...prevCart,
                    {
                      title,
                      desc,
                      img,
                      price,
                      location,
                      type,
                      quantity,
                    },
                  ]);
                }
                if (cart.length != 0) {
                  if (
                    cart.some((item) => {
                      return item.title == title;
                    })
                  ) {
                    const index = cart.findIndex((item) => {
                      return item.title == title;
                    });
                    cart[index].quantity += quantity;
                    setCart((prevCart) => [...prevCart]);
                  } else {
                    setCart((prevCart) => [
                      ...prevCart,
                      {
                        title,
                        desc,
                        img,
                        price,
                        location,
                        type,
                        quantity,
                      },
                    ]);
                  }
                }
                setComboModule(false);
                setShowAlert(true);
                setAlertText(`${title} Added to Cart!`);
                setAlertLink(true);
              }}
            >
              Add to Cart
            </Button>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
