import "./App.css";
import Calendar from "react-calendar";
import React, { useEffect, useState } from "react";
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
  const [errorMessage, setErrorMessage] = useState();
  const [emailHolder, setEmailHolder] = useState();
  const [passwordHolder, setPasswordHolder] = useState();

  function emailHandler(e) {
    setEmailHolder(e.target.value);
  }
  function passwordHandler(e) {
    setPasswordHolder(e.target.value);
  }

  function apiCall(URL) {
    let API_KEY = "key=AIzaSyCtRIeY7HpqYpDAZjC-QTs4WDXtlkUa7Xk";
    const fetchUser = async () => {
      try {
        const response = await fetch(URL + API_KEY, {
          method: "POST",
          body: JSON.stringify({
            email: emailHolder,
            password: passwordHolder,
            returnSecureToken: true,
          }),
          headers: {
            "Content-type": "application/json",
          },
        });

        const data = await response.json();

        if (data && !data.error) {
          console.log(data);
          setAuth({ token: data.idToken, expiresIn: data.expiresIn });
          setIsLoggedIn(true);
        } else {
          setErrorMessage(data.error.message);
        }
      } catch (err) {
        setErrorMessage(err);
      }
    };
    fetchUser();
  }

  function createUser(e) {
    e.preventDefault();
    let URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?";
    apiCall(URL);
  }

  function logInUser(e) {
    e.preventDefault();
    let URL =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?";
    apiCall(URL);
  }
  // ---------------------------- Timer for autoTimeout --------------------------------------
  const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
  ];

  let timer;

  // this resets the timer if it exists.
  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      // clears any pending timer.
      resetTimer();
      // Listener clean up. Removes the existing event listener from the window
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      // logs out user
      logOutHandler();
    }, 60000); // 10000ms = 10secs.
  };

  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
  }, []);
  // ---------------------------- End of Timer for autoTimeout --------------------------------------

  function logOutHandler() {
    localStorage.clear();
    window.location.reload(false);
  }

  return (
    <>
      {isLoggedIn && (
        <Navbar bg="dark" variant="dark" style={{ padding: "4px 0px" }}>
          <Nav className="container-fluid">
            <Nav.Item>
              <span style={{ color: "white", paddingLeft: "60px" }}>
                Hello &#128075;, {emailHolder}!
              </span>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={logOutHandler}
                style={{ paddingRight: "60px" }}
              >
                <span>
                  <img
                    src={logout}
                    alt="logout-icon"
                    style={{ width: "26px" }}
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
            User: {
              createUser: createUser,
              logInUser: logInUser,
            },
            error: errorMessage,
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
              <AllEvents day={day} email={emailHolder} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
