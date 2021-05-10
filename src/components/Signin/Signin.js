import React from "react";
import Button from "../Forms/Button/Button";
import "./signin.scss";
import { auth, signInWithGoogle } from "./../../firebase/utils";
import { Component } from "react";
import Form from "../Forms/FormInput/Form";

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
    const {email, password} = this.state

    try{
        await auth.signInWithEmailAndPassword(email, password)
        this.setState({
            ...initialState
        })
    } catch(err){

    }
  };

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({
        [name]: value
    })
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="signin">
        <div className="wrap">
          <h2>LogIn</h2>
          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>

              <Form placeholder="E-mail" type="email" name="email" value={email} onChange={this.handleChange} />
              <Form placeholder="Password" type="password" name="password" value={password} onChange={this.handleChange} />

                <Button type="submit">
                    Login
                </Button>
              <div className="socialSignin">
                <div className="row">
                  <Button className="google-sign" onClick={signInWithGoogle}>
                    Sign in with Google
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
