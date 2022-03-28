import React, { useContext } from "react";
import MenuCards from "./MenuCards";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Context } from "../context";
import { menuItems } from "../data/menuItems";

const menuCards = (filteredItems: {}[]): JSX.Element[] =>
  //build each menu card for each item
  filteredItems.map(
    (item: any): JSX.Element => (
      <Col key={item.title} className="flex justify-center items-center ">
        <MenuCards
          variants={item.variants ? item.variants : undefined}
          title={item.title}
          price={item.price}
          desc={item.desc}
          img={item.img}
          sides={item.sides}
        />
      </Col>
    )
  );
const loadMenu = (location: string, type: string) => {
  //filter the menu by type aka combo, sides, dessert
  const items: {}[] = menuItems.filter(
    (item: { type: string; location: string }): boolean => {
      return (
        item.type === type &&
        (item.location === "all" || item.location === location)
      );
    }
  );
  return menuCards(items);
};

export default function Menu() {
  const { location }: any = useContext(Context);

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
