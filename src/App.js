import React, { useEffect } from "react";
import { Routes } from "react-router";
import {
  Route,
  Link,
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddReview from "./components/AddReview";
import Restaurant from "./components/Restaurant";
import RestaurantsList from "./components/RestaurantsList";
import Login from "./components/Login";
import NavBar from "./components/NavBar";

function App() {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    retrieveUser();
  }, []);

  async function login(user = null) {
    setUser(user);
    localStorage.setItem("name", user.name);
    localStorage.setItem("id", user.id);
  }

  async function logout() {
    setUser(null);
    localStorage.clear();
  }

  async function retrieveUser() {
    if (localStorage.getItem("name") && localStorage.getItem("id")) {
      setUser({
        name: localStorage.getItem("name"),
        id: localStorage.getItem("id"),
      });
    }
  }

  return (
    <div className="App">
      <Router>
        <NavBar user={user} login={login} logout={logout} />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<RestaurantsList />} />
            <Route path="/restaurants" element={<RestaurantsList />} />
            <Route
              path="/restaurants/:id/review"
              element={<AddReview user={user} />}
            />
            <Route
              path="/restaurants/:id"
              element={<Restaurant user={user} />}
            />
            <Route path="/login" element={<Login login={login} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
