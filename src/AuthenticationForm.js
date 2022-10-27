import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AuthenticationForm.css";

function AuthenticationForm(props) {
  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  return (
    <div className="Auth-form-container">
      <form
        className="Auth-form"
        onSubmit={
          authMode === "signin"
            ? props.data.User.logInUser
            : props.data.User.createUser
        }
      >
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">
            {authMode === "signin" ? "Sign In" : "Sign Up"}
          </h3>
          <div className="text-center">
            {authMode === "signup" ? (
              <div>
                Already registered?&nbsp;
                <span
                  className="link-primary"
                  onClick={changeAuthMode}
                  style={{ cursor: "pointer" }}
                >
                  Sign In
                </span>
              </div>
            ) : (
              <div>
                Not registered yet?&nbsp;
                <span
                  className="link-primary"
                  onClick={changeAuthMode}
                  style={{ cursor: "pointer" }}
                >
                  Sign Up
                </span>
              </div>
            )}
          </div>
          <br></br>
          {props.data.error && (
            <div
              class="alert alert-danger"
              style={{ padding: "10px", textAlign: "center" }}
              role="alert"
            >
              <small style={{ textAlign: "center" }}>{props.data.error}</small>
            </div>
          )}

          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={props.data.email.handler}
              value={props.data.email.email}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={props.data.password.handler}
              value={props.data.password.password}
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          {/* <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p> */}
        </div>
      </form>
    </div>
  );
}

export default AuthenticationForm;
