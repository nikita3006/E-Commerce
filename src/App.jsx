import React from 'react';
import SignUp from './authentication/SignUp';
import LogIn from './authentication/LogIn';
import { Route, Routes, redirect} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './Store/AuthContext';
import Error from './Components/Error';
import Header from './Components/Header/Header';
import ShowProduct from './Components/Pages/ShowProduct';
import ProductDetail from './Components/Pages/ProductDetail';
import Home from './Components/Pages/Home'
import AboutUs from './Components/Pages/AboutUs';
import Cart from './Components/Pages/Cart';
import { ThemeProvider } from './Components/ThemeContext/ThemeContext';



function App() {
  const authCtx = useContext(AuthContext);

  return (
  <>
    <Header/>
    <ThemeProvider>
  <Routes>
    <Route index element={<LogIn/>} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<LogIn/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/aboutus" element={<AboutUs/>} />
    <Route path="/cart" element={<Cart/>} />
    <Route path="/showproduct" element={<ShowProduct/>} exact /> 
    {authCtx.isLoggedIn && <Route path="/showproduct/detailPage/:id" element={<ProductDetail/>} /> }
    <Route path= "*"  element={<Error/>} />
  </Routes>
  </ThemeProvider>
  </>

  )
}

export default App;