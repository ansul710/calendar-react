import "./App.css";
import Calendar from "react-calendar";
import React, { useState } from "react";
import "./Calendar.css";
import AllEvents from "./AllEvents";
import AuthenticationForm from "./AuthenticationForm";
import logout from "./logout.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function App() {
  const [value, onChange] = useState(new Date());
  const day = value.toLocaleDateString();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth, setAuth] = useState({ token: "", expiresIn: "" });

  const [emailHolder, setEmailHolder] = useState();
  const [passwordHolder, setPasswordHolder] = useState();

  function emailHandler(e) {
    setEmailHolder(e.target.value);
  }
  function passwordHandler(e) {
    setPasswordHolder(e.target.value);
  }
  function createUser(e) {
    e.preventDefault();
    const postUser = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCtRIeY7HpqYpDAZjC-QTs4WDXtlkUa7Xk",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailHolder,
              password: passwordHolder,
              returnSecureToken: true,
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data) {
          setAuth({ token: data.idToken, expiresIn: data.expiresIn });
          setIsLoggedIn(true);
        }
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    postUser();
  }

  function logInUSer(e) {
    e.preventDefault();
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCtRIeY7HpqYpDAZjC-QTs4WDXtlkUa7Xk",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailHolder,
              password: passwordHolder,
              returnSecureToken: true,
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data) {
          setAuth({ token: data.idToken, expiresIn: data.expiresIn });
          setIsLoggedIn(true);
        }
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }

  function logOutHandler() {
    window.location.reload(false);
  }

  return (
    <>
      {isLoggedIn && (
        <Navbar bg="dark" variant="dark">
          <Nav className="container-fluid">
            <Nav.Item></Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={logOutHandler}
                style={{ paddingRight: "60px" }}
              >
                <span>
                  <img
                    src={logout}
                    alt="logout-icon"
                    style={{ width: "35px" }}
                  />
                </span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
      )}

      {!isLoggedIn ? (
        <AuthenticationForm
          data={{
            User: { createUser: createUser, logInUSer: logInUSer },
            email: { email: emailHolder, handler: emailHandler },
            password: { password: passwordHolder, handler: passwordHandler },
          }}
        />
      ) : (
        <div className="App App-header">
          <div className=" flex-container">
            <div className="Calendar-border flex-child">
              <Calendar onChange={onChange} />
            </div>
            <div className="flex-child">
              <AllEvents day={day} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
