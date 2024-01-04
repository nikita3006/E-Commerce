import React, {useState} from 'react'
import AuthContext from './AuthContext'

function AuthProvider(props) {
     const token = localStorage.getItem("token") 
    const email = localStorage.getItem("email") //tab band hone k baad bh wo session se utha rha token id
    const [isLoggedIn, setIsLoggedIn] = useState(token);
    const [isEmail, setIsEmail] = useState(email);
// const [count, setCount] = useState(0)
// const handlerCount = (e) =>{
//   setCount(prev=> prev +1 ) //setcount is a async function......reconslation
//   console.log(count)
// }
    const logIn =(token,newEmail)=>{
      console.log(newEmail ,"inLogin")
        localStorage.setItem("token", token)
        localStorage.setItem("email", newEmail)
        setIsLoggedIn(true)
        setIsEmail(newEmail)
    }
   

    const loggedOut =()=>{
        localStorage.clear()
        setIsLoggedIn(false)
    }
    const obj = {
        isLoggedIn,
        logIn,
        loggedOut,
        isEmail
        } //not neccessary to use setemail beacuse we can accesswe can get all the data by isLoggedIn
  return (
    <AuthContext.Provider value= {obj}>{props.children}</AuthContext.Provider>
  )
}

export default AuthProvider;