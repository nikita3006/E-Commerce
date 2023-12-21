import React, {useState} from 'react'
import AuthContext from './AuthContext'

function AuthProvider(props) {
    const token = localStorage.getItem("token") //tab band hone k baad bh wo session se utha rha token id
    const [isLoggedIn, setIsLoggedIn] = useState(token);

    const logIn =(token)=>{
        localStorage.setItem("token", token)
        setIsLoggedIn(true)
    }
    const loggedOut =()=>{
        localStorage.clear()
        setIsLoggedIn(false)
    }
    const obj = {
        isLoggedIn,
        logIn,
        loggedOut
    }
  return (
    <AuthContext.Provider value= {obj}>{props.children}</AuthContext.Provider>
  )
}

export default AuthProvider;