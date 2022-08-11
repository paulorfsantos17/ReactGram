import './Navbar.css'

import { NavLink, Link } from 'react-router-dom'
import {BsSearch,bsHouseFill , BsFillPersonFill, BsCameraFill, BsHouseDoorFill } from 'react-icons/bs'

const Navbar = () => {
  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>
      <form id="search-form">
        <BsSearch/>
        <input type="text" placeholder='Pesquisar...'/>
      </form>
      <ul id="nav-links">
        <li>
          <NavLink to="/">
            <BsHouseDoorFill />
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" >
            Entrar
          </NavLink>
        </li>
        <li>
          <NavLink to="/Register" >
            Cadastrar
          </NavLink>
        </li>
      </ul>
      
      
    </nav>
  )
}

export default Navbar