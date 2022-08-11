
import './App.css';

import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className='App'>
      
      <BrowserRouter>
      <Navbar></Navbar>
      <div className='container'>
      <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </div>
        <Footer></Footer>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
