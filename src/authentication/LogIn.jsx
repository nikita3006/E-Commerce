import React, { useContext, useRef, useState } from "react";
import styled from 'styled-components';
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../Store/AuthContext";
import { Parallax } from 'react-parallax';
import { z, object } from 'zod';
import back2 from '../assets/Image/back2.jpg';


const schema = object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(2),
  phoneNumber: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: 'Invalid phone number format. Please enter 10 digits.',
  }),
});

const LoginContainer = styled.div`
  background-color: rgba (230, 176, 170 );
  border-radius: 8px;
  box-shadow: 0 0 40px rgba(200, 40, 80, 0.7); 
  padding: 20px;
  width: 300px;
  text-align: center;
  margin: 0 auto; 
  margin-bottom:90px;
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

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  async function switchAuthModeHandler(e) {
    try {
      e.preventDefault();
      schema.parse({ email, password, firstName, phoneNumber });
      const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrlV5MWuup7EMTd6AkwJVuA_aH7aSmWuY", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response) {
        throw new Error('Error with response');
      }
      const data = await response.json();
      authCtx.logIn(data.idToken); //unique key
      console.log(data);
      navigate("/home");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Parallax bgImage={back2} strength={800}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <LoginContainer>
        <h2>Login</h2>
        <Input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={switchAuthModeHandler}>Login</Button>
      </LoginContainer>
    </div>
    </Parallax>
  );
}

export default LogIn;
