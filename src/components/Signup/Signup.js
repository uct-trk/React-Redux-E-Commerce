import React from "react";
import { Component } from "react";
import Button from "../Forms/Button/Button";
import Form from "../Forms/FormInput/Form";
import "./signup.scss";

import { auth, handleUserProfile } from './../../firebase/utils'

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: []
};

class Signup extends Component {
  state = {
    ...initialState,
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  // Form submit işlemleri
  // password confirm passwordla eşleşmezse errror döndürecek
  handleFormSubmit = async (event) => {
      event.preventDefault()
      const {displayName, email, password, confirmPassword} = this.state

      if (password !== confirmPassword) {
          const err = ["Password is not matching"]
          this.setState({
              errors: err
          })
          return
      }
      try{
        const {user} = await auth.createUserWithEmailAndPassword(email, password)
        await handleUserProfile(user, {displayName})

        this.setState({
            ...initialState
        })

      } catch(err){

      }
  }

  render() {
    //destructuring
    const { displayName, email, password, confirmPassword, errors } = this.state;

    return (
      <div className="signup">
        <div className="wrap">
          <h2>Signup</h2>
            {
                errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            return (
                                <li style={{color:"red"}} key={index}>{err}</li>
                            )
                        })}
                    </ul>
                )
            }
          <div className="form-wrap">
            <form onSubmit={this.handleFormSubmit}>
              <Form
                type="text"
                name="displayName"
                value={displayName}
                placeholder="Full name"
                onChange={this.handleChange}
              />

              <Form
                type="email"
                name="email"
                value={email}
                placeholder="E-mail"
                onChange={this.handleChange}
              />

              <Form
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
              />

              <Form
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />

              <Button>Sign Up</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
