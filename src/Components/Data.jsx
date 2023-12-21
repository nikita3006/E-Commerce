import React, { useState, useEffect, useContext } from 'react';
import Form from './Form';
import AuthContext from '../Store/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';


function Data() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const navigate= useNavigate();
  const authCtx = useContext(AuthContext);
  async function fetchDataFromFirebase() {
    try {
      const response = await fetch(
        "https://nikuuu-90d07-default-rtdb.firebaseio.com/form.json"
      );
      const data = await response.json();

      let arr = [];
      for (const key in data) {
        arr.push({ id: key, ...data[key] });
      }

      setData(arr);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
     fetchDataFromFirebase() 

  }, []); 

  const loggeOutHandler = (e)=>{
    authCtx.loggedOut()
    navigate("/login")
  }

  const submitHandler = async(e) => {
    try{
      e.preventDefault();
      const obj={
        name:firstName
      }
      const response = await fetch("https://nikuuu-90d07-default-rtdb.firebaseio.com/form.json",{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await response.json()
      console.log("Name SUbmitted:", data)
      setFirstName('')
      if(response.ok){ //aya hai dtaa nh y btayega
        fetchDataFromFirebase()
      }
    }
    catch{
      console.log("error")
  }
  }

  return (
    <>
     <button type="submit" onClick={loggeOutHandler}>Log Out</button>
      <form onSubmit={submitHandler}>
        <label htmlFor="fname">First Name</label>
        <input
          id="fname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <Form data={data}/>
      
    </>
  );
}

export default Data;
