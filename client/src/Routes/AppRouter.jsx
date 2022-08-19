import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from '../Pages/Home/Home'
import App from '../App'

import Login  from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import { VerifyAccount } from '../Pages/VerifyAccount/VerifyAccount'
import { ContactUs } from '../Pages/ContactUs/ContactUs'
import {Checkout } from '../Pages/Suscription/Checkout'
import { UserMachineries } from '../Pages/Machineries/UserMachineries'

const AppRouter = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<App/>}>

                <Route path="/Home" element={<Home/>}/>
                <Route path="/ContactUs" element={<ContactUs/>}/>
                <Route path="/machineries" element={<UserMachineries/>}></Route>
                
            </Route>

            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/auth/verifyAccount/:userId" element={<VerifyAccount/>}></Route>
            <Route path="/checkout" element={<Checkout/>}></Route>

            
        </Routes>
    </Router>
  )
}

export default AppRouter;

