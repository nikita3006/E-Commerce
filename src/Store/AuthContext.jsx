import React from 'react'

const AuthContext= React.createContext({
isLoggedIn: false,
logIn:()=>{},
loggedOut: () => {},
})    
 


export default AuthContext;