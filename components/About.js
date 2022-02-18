import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from 'next/image'
export default function About() {
  return (
    <Container id="about" className="my-5">
      <h2 className="text-center ">About Us</h2>
      <Container>
          <Row xs={1} md={2}>
        <Col className='flex justify-center items-center'>
          <Image
            src="/images/ducks.jpg"
            width="300"
            height="300"
            
            alt='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in'
          />
        </Col>
        <Col className='flex justify-center items-center'>
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
    </Container>
  );
}
