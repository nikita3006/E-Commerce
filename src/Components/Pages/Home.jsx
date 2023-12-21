import React from 'react';
import { Parallax } from 'react-parallax';
import image1 from '../../assets/Image/image1.jpg';

const parallaxContainerStyle = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const parallaxContentStyle = {
  textAlign: 'center',
  color: '#fff', 
};
const footerStyle = {
  backgroundColor: '#F4F6F6 ',
  color: '#2C3E50 ',
  padding: '3px',
  textAlign: 'center',
  bottom: '0',
  width: '100%',
};

function Home() {
  return (
    <>
      <Parallax
        bgImage={image1}
        strength={800}
        style={parallaxContainerStyle}
      >
        <div style={parallaxContentStyle}>
          <h1>nikita</h1>
        </div>
      </Parallax>
      <footer style={footerStyle}> 
        <p>&copy; 2023 Your eCommerce Store. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Home;
