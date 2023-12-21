import React from "react";
import Carousel from "react-bootstrap/Carousel";
import about from "../../assets/Image/about.jpg";

const carouselStyle = {
  width: "100vw", 
  height: "100vh",
};

const footerStyle = {
  backgroundColor: "#F4F6F6",
  color: "#2C3E50",
  padding: "3px",
  textAlign: "center",
  bottom: "0",
  width: "100%",
};

function AboutUs() {
  return (
    <>
      <div>
        <Carousel style={carouselStyle} data-bs-theme="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="src\assets\Image\contact4.jpg"
              alt="First slide"
              style={carouselStyle}
            />
            <Carousel.Caption>
              <h5>Who we are</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto in excepturi error, aperiam illo ipsam, itaque illum est, voluptatum minus id eius. A, at pariatur?
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="src\assets\Image\contact2.jpg"
              alt="Second slide"
              style={carouselStyle}
            />
            <Carousel.Caption>
              <h5>Why we?</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem35
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis placeat harum veniam fugit repudiandae ex error possimus veritatis aut ipsum pariatur, libero nostrum autem dolorem.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <footer style={footerStyle}>
        <p>&copy; 2023 Your eCommerce Store. All rights reserved.</p>
      </footer>
    </>
  );
}

export default AboutUs;

