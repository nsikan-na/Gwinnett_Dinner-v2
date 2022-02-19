import React, { useState, useContext } from "react";
import MenuCards from "./MenuCards";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LocationContext } from "../context/LocationContext";
import { menuItems } from "../data/menuItems";

const menuCards = (filteredItems) => {
  return filteredItems.map((item) => (
    <Col key={item.title} className="flex justify-center items-center">
      <MenuCards
        title={item.title}
        price={item.price}
        desc={item.desc}
        img={item.img}
        location={item.location}
        type={item.type}
        sides={item.sides}
      />
    </Col>
  ));
};
const loadMenu = (location, type) => {
  const items = menuItems.filter((item) => {
    return (
      item.type === type &&
      (item.location === "all" || item.location === location)
    );
  });
  return menuCards(items);
};

export default function Menu() {
  const { location } = useContext(LocationContext);
  return (
    <Container id="menu">
      <h1 className="text-center my-3">Menu</h1>
      <h2 className="text-center my-3">Combos</h2>
      <Row>{loadMenu(location, "combo")}</Row>
      <h2 className="text-center my-3">Sides</h2>
      <Row>{loadMenu(location, "side")}</Row>
      <h2 className="text-center my-2">Desserts</h2>
      <Row>{loadMenu(location, "dessert")}</Row>
    </Container>
  );
}
