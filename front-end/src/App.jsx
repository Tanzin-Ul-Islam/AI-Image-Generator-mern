import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Navbar from './component/navbar/Navbar';
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-post' element={<CreatePost />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
