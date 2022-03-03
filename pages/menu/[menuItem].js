import React, { useState, useContext, useRef } from "react";
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
const menuItems = [
  {
    title: "Hot Dog & Chips",
    price: "6.99",
    desc: `Assorted(beef,sausage,and vegetarian) gourmet hotdogs`,
    type: "combo",
    img: "hot_dog_&_chips.jpg",
    location: "Snellville",
    sides: 0,
  },
  {
    title: "Cheesecake",
    price: "8.95",
    desc: `In house Assorted Cheesecake`,
    type: "dessert",
    img: "cheesecake.jpg",
    location: "Snellville",
  },

  {
    title: "Fried Shrimp & Fries",
    price: "9.99",
    desc: `Beer battered fried shrimp with seasoned fries`,
    type: "combo",
    img: "fried_shrimp_&_fries.jpg",
    location: "Peachtree Corners",
    sides: 0,
  },
  {
    title: "Grilled Shrimp & 2 Sides",
    price: "9.99",
    desc: `Grilled Garlic Shrimp served with fresh parsley and olive oil`,
    type: "combo",

    img: "grilled_shrimp.jpg",
    location: "Peachtree Corners",
    sides: 2,
  },
  {
    title: "Cobblor",
    price: "4.99",
    desc: `Freshly baked warm peach cobbler`,
    type: "dessert",
    img: "cobblor.jpg",
    location: "Peachtree Corners",
  },
  {
    title: "Steak & 2 Sides",
    price: "12.99",
    desc: `New York Style Steak`,
    type: "combo",

    img: "steak.jpg",
    location: "Lawrenceville",
    sides: 2,
    variants: ["Rare", "Medium Rare", "Medium", "Medium Well", "Well"],
  },
  {
    title: "Mashed Potatoes",
    price: "5.99",
    desc: `Garlic mashed potatoes`,
    type: "side",
    img: "mashed_potatoes.jpg",
    location: "Lawrenceville",
  },
  {
    title: "Pie",
    price: "3.99",
    desc: `Choose between blueberry pie,pink lemonade pie, chocolate chip cookie,peanut butter pie,white chocolate silk,and brown sugar pumpkin pie`,
    type: "dessert",
    img: "pie.jpg",
    location: "Lawrenceville",
  },
  {
    title: "Chicken & 2 Sides",
    price: "12.99",
    desc: `Parmesan Breaded Chicken severed with greens and lemon on the side`,
    type: "combo",
    img: "chicken.jpg",
    location: "all",
    sides: 2,
  },
  {
    title: "Fish & 2 Sides",
    price: "14.99",
    desc: `Pan seared salmon severed with fresh greens and lightly sauted medley tomatoes`,
    type: "combo",
    img: "fish.jpg",
    location: "all",
    sides: 2,
  },
  {
    title: "Burger & 1 Side",
    price: "12.99",
    desc: `100% Beef Whiskey Burger`,
    type: "combo",
    img: "burger.jpg",
    location: "all",
    sides: 1,
  },
  {
    title: "Ice Cream",
    price: "2.99",
    desc: `Choose between chocolate chip, vanilla, butter pecan, strawberry, and cookies and cream`,
    type: "dessert",
    img: "ice_cream.jpg",
    location: "all",
  },

  {
    title: "Fries",
    price: "4.99",
    desc: `French fries with in house ketchup`,
    type: "side",
    img: "fries.jpg",
    location: "all",
  },
  {
    title: "Broccoli",
    price: "3.99",
    desc: `Fresh steamed broccoli`,
    type: "side",
    img: "broccoli.jpg",
    location: "all",
  },
  {
    title: "Garlic Pasta & Bread",
    price: "6.99",
    desc: `Fresh breadstick with served with in-house marinated sauce and in house garlic pasta`,
    type: "side",
    img: "garlic_pasta_&_bread.jpg",
    location: "all",
  },
];

export default function MenuItems({ menuItems }) {
  const { cart, setCart, setAlertText, setAlertLink } = useContext(Context);
  const router = useRouter();
  const index = menuItems.findIndex((item) => {
    return item.title == router.query.menuItem;
  });
  const menuItem = menuItems[index];
  const { title, price, desc, type, img, location, sides, variants } = menuItem;
  const [show, setShow] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [doneError, setDoneError] = useState(false);
  const form = useRef();
  const [error, setError] = useState(false);

  return (
    <Container>
      <Modal
        onExit={() => {
          router.push(`/#${type}`);
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
          <Image
            src={`/images/${img}`}
            className="mx-auto w-8/12"
            width="300%"
            height="300%"
            alt={`${title} image`}
          />
          <br />
          <h4>${price}</h4>
          <h5>Select quantity</h5>
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
                  router.push(`/#${type}`);

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
                    <tr>
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
                    </tr>
                    <tr>
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
                    </tr>
                    <tr>
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
                    </tr>
                  </tbody>
                  <tfoot></tfoot>
                </table>
                <h6
                  className={`text-red-500 ${error ? "visible" : "invisible"}`}
                >
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
                    router.push(`/#${type}`);
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
                  router.push(`/#${type}`);

                  setAlertText(`${title} Added to Cart!`);
                  setAlertLink(true);
                }}
              >
                Add to Cart
              </Button>
            )
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
                router.push(`/#${type}`);
                setAlertText(`${title} Added to Cart!`);
                setAlertLink(true);
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
