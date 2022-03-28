import React, { useState, useContext, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Form from "react-bootstrap/Form";
import { Context } from "../../context";
import LandingPage from "../../components/LandingPage";
import { menuItems } from "../../data/menuItems";
export default function MenuItems({ menuItems }) {
  const { cart, setCart, setCardSpinner, location } = useContext(Context);
  const router = useRouter();
  const index = menuItems.findIndex((item) => {
    return item.title == router.query.menuItem;
  });
  const menuItem = menuItems[index];
  const { title, price, desc, type, img, sides, variants } = menuItem;
  const [show, setShow] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [doneError, setDoneError] = useState(false);
  const form = useRef();
  const [error, setError] = useState(false);
  const locationSideItems = [
    " Fries",
    " Broccoli",
    " Pasta & Bread",
    " Mashed Potatoes",
  ];

  useEffect(() => {
    setCardSpinner(false);
  }, []);
  return (
    <Container>
      <Modal
        onExit={() => {
          router.push(`/#${title}`);
        }}
        show={show}
        onHide={() => setShow(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        centered
      >
        <Modal.Header className="" closeButton>
          <Modal.Title>
            <h3 className="text-red-600">{title}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Image
            src={`/images/${img}`}
            className="mx-auto w-8/12"
            width="300%"
            height="300%"
            alt={`${title} image`}
          />
          <br />
          <h4 className="mt-2"> ${price}</h4>
          <h5 className="">Select quantity</h5>
          <Container className="flex justify-center items-center space-x-5">
            <Button
              variant="primary"
              style={{ border: "0px" }}
              className="bg-transparent"
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

          {type == "combo" ? (
            sides != 0 ? (
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
                              item.sideItems.toString() ==
                                sideItems.toString() &&
                              item.variant == variant
                            );
                          })
                        ) {
                          const index = cart.findIndex((item) => {
                            return (
                              item.title == title &&
                              item.sideItems.toString() ==
                                sideItems.toString() &&
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
                  router.push(`/cart`);
                }}
              >
                {variants ? (
                  <Container>
                    <h5>Select Degree</h5>
                    <table className="mx-auto">
                      <thead></thead>
                      <tbody className="text-left">
                        {variants
                          ? variants.map((variant) => {
                              return (
                                <tr key={variant}>
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
                              );
                            })
                          : ""}
                      </tbody>
                      <tfoot></tfoot>
                    </table>
                    <h6
                      className={`text-red-500 ${
                        doneError ? "block" : "hidden"
                      }`}
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
                  <thead></thead>
                  <tbody className="text-left">
                    {locationSideItems.map((item) => {
                      return (
                        <tr key={item}>
                          <td>
                            <Form.Check
                              inline
                              name="side"
                              type="checkbox"
                              id={item}
                            />
                          </td>
                          <td>
                            <Form.Label
                              htmlFor={item}
                              className="cursor-pointer"
                            >
                              {item}
                            </Form.Label>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <h6
                  className={`text-red-500 ${error ? "visible" : "invisible"}`}
                >
                  You must enter {sides} sides!
                </h6>
                <Button
                  className="myButton"
                  type="submit"
                  style={{ backgroundColor: "red", border: "0px" }}
                >
                  Add to Cart
                </Button>
              </Form>
            ) : (
              <Button
                className=" mt-4 myButton"
                style={{ backgroundColor: "red", border: "0px" }}
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
                        type,
                        quantity,
                      },
                    ]);
                    router.push(`/cart`);
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
                          type,
                          quantity,
                        },
                      ]);
                    }
                  }
                  router.push(`/cart`);
                }}
              >
                Add to Cart
              </Button>
            )
          ) : (
            <Button
              className=" mt-4 myButton"
              type="submit"
              style={{ backgroundColor: "red", border: "0px" }}
              onClick={() => {
                if (cart.length === 0) {
                  setCart((prevCart) => [
                    ...prevCart,
                    {
                      title,
                      desc,
                      img,
                      price,
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
                        type,
                        quantity,
                      },
                    ]);
                  }
                }
                router.push(`/cart`);
              }}
            >
              Add to Cart
            </Button>
          )}
        </Modal.Body>
      </Modal>
      <LandingPage />
    </Container>
  );
}
export async function getServerSideProps() {
  return {
    props: {
      menuItems,
    },
  };
}
