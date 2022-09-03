import "./App.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import { useAuth } from "./hooks/useAuth";
import EditProfile from "./pages/EditProfile.js/EditProfile";
import Profile from "./pages/Profile/Profile";
import Photo from "./pages/Photo/Photo";
import Search from "./pages/Search/Search";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    <p>Carregando...</p>;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/profile"
              element={auth ? <EditProfile /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/users/:id"
              element={auth ? <Profile /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/search"
              element={auth ? <Search /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/photos/:id"
              element={auth ? <Photo /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/register"
              element={!auth ? <Register /> : <Navigate to="/" />}
            ></Route>
          </Routes>
        </div>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
