import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import Footer from './components/Footer/Footer'
import MyCoins from './pages/MyCoins/MyCoins'

const App = () => {
  return (
    <div className='app'>

      <Navbar></Navbar>

      <Routes>

        <Route
        path='/'
        element={<Home></Home>}
        ></Route>

        <Route
        path='/coin/:coinId'
        element={<Coin></Coin>}
        ></Route>

        <Route
        path='/mycoins'
        element={<MyCoins></MyCoins>}
        ></Route>

      </Routes>

      <Footer></Footer>

      <div className="me">
        Created By Jitendriya Meher
      </div>

    </div>
  )
}

export default App