import React, { useRef, useState, useContext } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { z, object } from 'zod';
import { Parallax } from 'react-parallax';
import back from '../assets/Image/back.jpg';
// import AuthContext from '../Store/AuthContext.jsx';


const schema = object({
  email: z.string().email(),
  password: z.string().min(6),
});

const SignUpContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  text-align: center;
  margin: 0 auto; 
  margin-top: 90px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  // const authCtx = useContext(AuthContext);
  const [error, setError] = useState(null);



  async function switchAuthModeHandler(e) {
    try {
      e.preventDefault();
      setError(null);
  
      const validationData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
  
      schema.parse(validationData);
  
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCrlV5MWuup7EMTd6AkwJVuA_aH7aSmWuY', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validationData),
      });
  
      if (!response.ok) {
        throw new Error('Sign-up failed');
      }
  
      const responseData = await response.json();
  
      // Handle the response data as needed
  
      alert('Account created successfully');
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Sign-up failed');
    }
  }
  return (
    <Parallax bgImage={back} strength={800} style={{ height: '100vh' }}>
      <SignUpContainer >
        <h2>Sign Up</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Input
          type="email"
          placeholder="Email"
          ref={emailRef}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        <Button type="button" onClick={switchAuthModeHandler}>
          Create new account
        </Button>
      </SignUpContainer>
    </Parallax>
  );
}

export default SignUp;
