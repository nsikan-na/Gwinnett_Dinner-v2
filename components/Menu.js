import React, { useState, useContext } from "react";
import MenuCards from "./MenuCards";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LocationContext } from "../context/LocationContext";
import { menuItems } from "../data";

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
