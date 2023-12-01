import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddComment from "./components/addComment";
import GamesList from "./components/gamesList";
import Game from "./components/game";
import Login from "./components/login";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function App() {
  const [user, setUser] = useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div className="App" style={{ backgroundColor: "lightblue" }}>
      <Navbar bg="dark" expand="lg" variant="dark" className="navbar-dark">
        <Navbar.Brand style={{ color: "white", padding: ".8em" }}>
          FreeToPlay Games
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to={"/mm355_games"} style={{ color: "white" }}>
                Games
              </Link>
            </Nav.Link>
            <Nav.Link>
              {user ? (
                <Link
                  to={"/mm355_games"}
                  style={{ color: "white" }}
                  onClick={logout}
                >
                  Logout
                </Link>
              ) : (
                <Link to={"/mm355_login"} style={{ color: "white" }}>
                  Login
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br></br> {/*line break after the search button to look nicer */}
      <Switch>
        <Route exact path={["/", "/mm355_games"]} component={GamesList}></Route>

        <Route
          path="/mm355_games/:id/comment"
          render={(props) => <AddComment {...props} user={user} />}
        ></Route>
        <Route
          path="/mm355_games/:id/"
          render={(props) => <Game {...props} user={user} />}
        ></Route>
        <Route
          path="/mm355_login"
          render={(props) => <Login {...props} login={login} />}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
