import React from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function About() {
  return (
    <section id="about">
      <h2 className="centerText">About Us</h2>
      <Container>
          <Row>
        <Col>
          <Image
            src="https://www.rd.com/wp-content/uploads/2020/05/GettyImages-109433950-scaled.jpg"
            width="300"
          />
        </Col>
        <Col>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Col>
        </Row>
      </Container>
    </section>
  );
}
