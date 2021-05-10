import React from "react";
import Button from "../Forms/Button/Button";
import "./signin.scss";
import { auth, signInWithGoogle } from "./../../firebase/utils";
import { Component } from "react";
import Form from "../Forms/FormInput/Form";
import AuthWrapper from "../AuthWrapper/AuthWrapper";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

class Signin extends Component {
  state = {
    ...initialState,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (err) {}
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { email, password } = this.state;

    const configAuthWrapper = {
        headline: "Login"
    }

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          <form onSubmit={this.handleSubmit}>
            <Form
              placeholder="E-mail"
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <Form
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />

            <Button type="submit">Login</Button>
            <div className="socialSignin">
              <div className="row">
                <Button className="google-sign" onClick={signInWithGoogle}>
                  Sign in with Google
                </Button>
              </div>
            </div>
            <div className="links">
                <Link to="/recovery">
                    Reset Password
                </Link>
            </div>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default Signin;
