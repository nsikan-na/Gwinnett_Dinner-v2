import React, { useState, useContext } from "react";
import MenuCards from "./MenuCards";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LocationContext } from "../context/LocationContext";

const locations = [
  { title: "Snellville", postalCode: [30017, 30039, 30078] },
  {
    title: "Peachtree Corner",
    postalCode: [30071, 30092, 30096, 30097, 30360],
  },
  { title: "Lawrenceville", postalCode: [30043, 30046, 30049] },
  { title: "Mountain Park", postalCode: [30075] },
];
const menuItems = {
  general: [
    {
      title: "Chicken & 2 Sides",
      price: "5",
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      desert: false,
      img: "mock.jpg",
    },
    {
      title: "Fish & 2 Sides",
      price: "5",
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      desert: false,
      img: "mock.jpg",
    },
    {
      title: "Burger & 1 Side",
      price: "5",
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      desert: false,
      img: "mock.jpg",
    },
    {
      title: "Ice Cream",
      price: "5",
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      dessert: true,
      img: "mock.jpg",
    },
  ],
  sides: [
    {
      title: "Fries",
      price: "5",
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      desert: false,
      img: "mock.jpg",
    },
    {
      title: "Broccoli",
      price: "5",
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      desert: false,
      img: "mock.jpg",
    },
    {
      title: "Garlic Pasta & Bread",
      price: "5",
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      desert: false,
      img: "mock.jpg",
    },
  ],
  snellville: [
    {
      title: "Hot Dog & Chips",
      price: "5",
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      desert: false,
      img: "mock.jpg",
    },
    {
      title: "Cheesecake",
      price: "5",
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      dessert: true,
      img: "mock.jpg",
    },
  ],
  peachtreeCorners: [
    {
      title: "Fried Shrimp & Fries",
      price: "5",
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      desert: false,
      img: "mock.jpg",
    },
    {
      title: "Grilled Shrimp & 2 Sides",
      price: "5",
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      desert: false,
      img: "mock.jpg",
    },
    {
      title: "Cobblor",
      price: "5",
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      dessert: true,
      img: "mock.jpg",
    },
  ],
  lawrenceville: [
    {
      title: "Steak & 2 Sides",
      price: "5",
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      desert: false,
      img: "mock.jpg",
    },
    {
      title: "Mashed Potatoes",
      price: "5",
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      desert: false,
      img: "mock.jpg",
    },
    {
      title: "Pie",
      price: "5",
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      dessert: true,
      img: "mock.jpg",
    },
  ],
};
const menuCards = (x) => {
  return x.map((item, index) => (
    <Col key={index} className="flex justify-center items-center">
      <MenuCards
        title={item.title}
        price={item.price}
        desc={item.desc}
        img={item.img}
        index={index}
      />
    </Col>
  ));
};
const loadExtraItems = (location) => {
  console.log(location);
  switch (location) {
    case "Snellville": {
      return menuCards(menuItems.snellville);
    }
    case "Peachtree Corners": {
      return menuCards(menuItems.peachtreeCorners);
    }
    case "Lawrenceville": {
      return menuCards(menuItems.lawrenceville);
    }
    default: {
    }
  }
  // setTotal()
};

export default function Menu() {
  const { location } = useContext(LocationContext);
  return (
    <Container id="menu">
      <h2 className="text-center my-3">Menu</h2>
      <Row>{menuCards(menuItems.general)}</Row>
      <h3 className="text-center my-2">Sides Items</h3>
      <Row>{menuCards(menuItems.sides)}</Row>
      {location !== "Mountain Park" ? (
        <h3 className="text-center my-2">Popular Items</h3>
      ) : (
        ""
      )}
      {location === "Snellville" ? (
        <Row>{loadExtraItems("Snellville")}</Row>
      ) : (
        ""
      )}
      {location === "Peachtree Corners" ? (
        <Row>{loadExtraItems("Peachtree Corners")}</Row>
      ) : (
        ""
      )}
      {location === "Lawrenceville" ? (
        <Row>{loadExtraItems("Lawrenceville")}</Row>
      ) : (
        ""
      )}
    </Container>
  );
}
