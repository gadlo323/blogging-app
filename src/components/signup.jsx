import React, { useState } from "react";
import { useAuth } from "../conteaxts/AutoConeaxt";
import { NavLink, useHistory } from "react-router-dom";
import "./signup.css";
const SignUp = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [passwordError, setPassError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { handleSiginup, handleSigngoogle } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setPassError("");
      setLoading(true);
      if (checkInput()) {
        const result = await handleSiginup(email, password, user);
        if (result) {
          setPassError(result);
        } else history.push("/");
      }
    } catch {
      setPassError("Filad to create an account");
    }
    setLoading(false);
  };
  const checkInput = () => {
    if (password === repeatPass) return true;
    else {
      setPassError("Passwords do not match");
      return false;
    }
  };

  const submitGoogle = async () => {
    try {
      setPassError("");
      const data = await handleSigngoogle();
      if (data.emailVerified) {
        history.push("/");
      }
    } catch {
      setPassError("Filad to create an Account with google  !");
    }
  };
  return (
    <>
      <section id="signup">
        <div className="wrepper">
          <img className="logo-img" src="./blogging.png" alt="" />
          <form className="form-sigin" onSubmit={onSubmit}>
            <input
              name="user"
              className="input-field"
              type="text"
              value={user}
              placeholder="Username"
              minLength="4"
              maxLength="12"
              onChange={(e) => setUser(e.target.value)}
              required
            />
            <input
              name="email"
              className="input-field"
              type="email"
              value={email}
              placeholder="exmple@exmple.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input-field"
              type="password"
              name="password"
              autoComplete="on"
              value={password}
              placeholder="Password"
              minLength="6"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="input-field"
              type="password"
              name="repeat"
              autoComplete="on"
              value={repeatPass}
              placeholder="Verify password"
              onChange={(e) => setRepeatPass(e.target.value)}
              required
            />
            <span className="error">{passwordError}</span>
            <button disabled={loading} type="submit" className="sigin-btn">
              <i className="fa fa-user-plus"> Sign Up</i>
            </button>
          </form>
          <NavLink className="registered-yet" to="/signin">
            Do you already have an account?
          </NavLink>
          <button type="button" className="sigin-google" onClick={submitGoogle}>
            <span> Sign Up via google</span>
            <img src="./icon_google.png" alt="" />
          </button>
        </div>
      </section>
    </>
  );
};

export default SignUp;
