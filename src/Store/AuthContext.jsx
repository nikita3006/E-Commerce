import React from 'react'

const AuthContext= React.createContext({
isLoggedIn: false,
logIn:()=>{},
loggedOut: () => {},
isEmail:""
})    
 


export default AuthContext;