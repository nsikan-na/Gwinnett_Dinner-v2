import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
export default function About() {
  return (
    <Container id="about" className="my-5">
      <h2 className="text-center ">About Us</h2>
      <Container className="">
        <Row xs={1} md={2}>
          <Col className="">
            <Image
              src="/images/food.jpg"
              width="300"
              height="300"
              alt="Lorem ipsum dolor sit amet"
            />
          </Col>
          <Col className="">
            <p>
              GD was built in 1975 and has been staple in the community ever
              since. Since then, we have opened several locations
              (Lawrenceville, Mountain Park, Peachtree Corner and Snellville)
              that welcome you to sit back, unwind and appreciate the loveliness
              of our many locations. Our team of culinarians sets you up with a
              scrumptious dining experience that’s makes it hard for you to
              choose just one thing from our diverse menu. We specialize in
              delicious food featuring fresh ingredients and masterful
              preparation by our culinary team. Our menu offers something for
              everybody, from the light passage of plates of mixed greens and
              little nibbles to the inconceivable T Bone steak. Our steaks are
              sliced in-house to guarantee flawlessness and expertly barbecued
              at 2,000 degrees. Whether you’re ordering a multi-course meal or
              grabbing a drink with a burger and fries at the bar, GD lively,
              casual yet upscale atmosphere makes it perfect for dining with
              friends, family, clients, and business associates.
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
