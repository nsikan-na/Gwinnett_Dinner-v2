import React from "react";
import MenuCards from "./MenuCards";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

export default function Menu() {
  return (
    <section id="menu">
      <Container>
        <h1 className='centerText'>Menu</h1>
        <h2 className='centerText'>General Items</h2>
        <Row>
          <Col>
            <MenuCards />
          </Col>
          <Col>
            <MenuCards />
          </Col>
          <Col>
            <MenuCards />
          </Col>
          <Col>
            <MenuCards />
          </Col>
        </Row>
        <h2 className='centerText'>Sides Items</h2>
        <Row>
          <Col>
            <MenuCards />
          </Col>
          <Col>
            <MenuCards />
          </Col>
          <Col>
            <MenuCards />
          </Col>
        </Row>
        <h2 className='centerText'>Popular Items</h2>
        <Row>
          <Col>
            <MenuCards />
          </Col>
          <Col>
            <MenuCards />
          </Col>
          <Col>
            <MenuCards />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
