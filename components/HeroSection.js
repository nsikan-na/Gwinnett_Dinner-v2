import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default function HeroSection() {
  return (
    <section style={{width:'30%', margin:'0 auto', paddingTop:'3%'}}>
    <Carousel id="home">
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src="https://121clicks.com/wp-content/uploads/2021/10/tiger_cub_lion_cub_best_friends_01.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src="http://ihoneida.com/wp-content/uploads/2017/05/bear-cub.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src="https://www.lollypop.org/wp-content/uploads/2018/01/Blg_Photo-2.jpg"
          alt="Third slide"
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
