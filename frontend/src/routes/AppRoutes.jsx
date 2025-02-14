import React from 'react'
import {Routes, BrowserRouter, Route} from 'react-router-dom'
import Login from '../screens/Login'
import Ragister from '../screens/Register'
import Home from '../screens/Home'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Ragister/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
