import "./Navbar.css";

import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsFillPersonFill,
  BsHouseDoorFill,
  BsFillCameraFill,
} from "react-icons/bs";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout, reset } from "../../slices/authSlice";

const Navbar = () => {
  const { auth } = useAuth();
  const user = useSelector((state) => state.auth.user);

  const [search, setSearch] = useState("")

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault()

    if(search) {
      return navigate(`/search?q=${search}`)
    }
  }
  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>
      <form onSubmit={handleSearch} id="search-form">
        <BsSearch />
        <input
          type="text"
          placeholder="Pesquisar..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </form>
      <ul id="nav-links">
        {auth ? (
          <>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsFillCameraFill />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/profile">
                <BsFillPersonFill />
              </NavLink>
            </li>
            <li onClick={handleLogout}>
              <span>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/Register">Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
