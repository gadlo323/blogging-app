import React, { useState } from "react";
import "./signin.css";
import { NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../conteaxts/AutoConeaxt";

const SignIn = () => {
  const { hendaleLogin, handleSigngoogle } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoginError("");
      const result = await hendaleLogin(email, password);
      if (result.operationType === "signIn") history.push("/");
      else setLoginError(result);
    } catch {
      setLoginError("Faild to LogIn...");
    }
  };

  const LoginGoogle = async () => {
    try {
      setLoginError("");
      const data = await handleSigngoogle();
      if (data.emailVerified) {
        history.push("/");
      }
    } catch {
      setLoginError("Filad to  Access with google Account  !");
    }
  };
  return (
    <>
      <section id="login">
        <div className="wrepper-login">
          <h1 className="head-line">Sign In</h1>
          <img className="logo-img" src="./profile.png" alt="" />
          <form className="form-login" onSubmit={(e) => onSubmit(e)}>
            <input
              name="email"
              className="input-login"
              type="email"
              value={email}
              placeholder="Email.."
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input-login"
              type="password"
              name="password"
              autoComplete="on"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="error">{loginError}</p>
            <button type="submit" className="login-btn">
              <i className="fa fa-user"> Login</i>
            </button>
            <button
              type="button"
              className="login-google"
              onClick={LoginGoogle}
            >
              <span> Sign In via google</span>
              <img src="./icon_google.png" alt="" />
            </button>
          </form>
          <NavLink className="registered-yet" to="/signUp">
            Do not have account yet?
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default SignIn;
