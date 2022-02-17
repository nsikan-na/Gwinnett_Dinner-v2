import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section style={{ width: "30%", margin: "0 auto", paddingTop: "3%" }}>
      <Carousel id="home">
        <Carousel.Item interval={5000}>
          <Image
            className="d-block w-100"
            src="/images/tiger.jpg"
            alt="First slide"
            height="900"
            width="1200"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <Image
            className="d-block w-100"
            src="/images/bear.jpg"
            alt="Second slide"
            height="900"
            width="1200"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <Image
            className="d-block w-100"
            src="/images/goat.jpg"
            alt="Third slide"
            height="900"
            width="1200"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}
