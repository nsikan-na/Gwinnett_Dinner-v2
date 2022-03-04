import React, { useState, useContext } from "react";
import MenuCards from "./MenuCards";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Context } from "../context";
import Image from "next/image";
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
    <Container>
      <h1 className="text-center my-3">Menu</h1>
      {/* {location && location != "Mountain Park" ? (
        <h5 className="text-center pb-1">
          (
          <Image
            src="/images/star.png"
            alt={`unique to ${location}`}
            width="25%"
            height="25%"
            className="inline translate-y-1 "
          />
          <div className="inline text-sm">=unique to {location} location)</div>
        </h5>
      ) : (
        ""
      )} */}
      <h2 className="text-center " id="combo">
        Combos
      </h2>
      <Row>{loadMenu(location, "combo")}</Row>
      <h2 className="text-center pt-16" id="side">
        Sides
      </h2>
      <Row>{loadMenu(location, "side")}</Row>
      <h2 className="text-center pt-16" id="dessert">
        Desserts
      </h2>
      <Row>{loadMenu(location, "dessert")}</Row>
    </Container>
  );
}
