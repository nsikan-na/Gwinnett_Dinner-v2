import React, { useState, useContext } from "react";
import MenuCards from "./MenuCards";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Context } from "../context";
import Image from "next/image";
import { menuItems } from "../data/menuItems";
const menuCards = (filteredItems) => {
  return filteredItems.map((item) => (
    <Col key={item.title} className="flex justify-center items-center ">
      <MenuCards
        variants={item.variants ? item.variants : false}
        title={item.title}
        price={item.price}
        desc={item.desc}
        img={item.img}
        local={item.location}
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
  const { location } = useContext(Context);

  return (
    <Container className="pb-5">
      <h1 className="text-center my-3 text-red-600">Menu</h1>
      <Row>
        {loadMenu(location, "combo")}
        {loadMenu(location, "side")}
        {loadMenu(location, "dessert")}
      </Row>
    </Container>
  );
}
