import React, {useState} from "react";
import Button from "../Forms/Button/Button";
import Form from "../Forms/FormInput/Form";
import "./signup.scss";

import { auth, handleUserProfile } from "./../../firebase/utils";
import AuthWrapper from "../AuthWrapper/AuthWrapper";
import { withRouter } from "react-router";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

const Signup = (props) => {
  
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState([])

  const reset = () => {
    setDisplayName('')
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setErrors([])
  } 

  // Form submit işlemleri
  // password confirm passwordla eşleşmezse errror döndürecek
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      const err = ["Password is not matching"];
      setErrors(err)
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });
        reset()
        props.history.push('/')
     
    } catch (err) {console.log(err)}
  };

  
    const configAuthWrapper = {
        headline: "Registration"
    }
    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="form-wrap">
          {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => {
                return (
                  <li style={{ color: "red" }} key={index}>
                    {err}
                  </li>
                );
              })}
            </ul>
          )}
          <form onSubmit={handleFormSubmit}>
            <Form
              type="text"
              name="displayName"
              value={displayName}
              placeholder="Full name"
              handleChange={e => setDisplayName(e.target.value)}
            />

            <Form
              type="email"
              name="email"
              value={email}
              placeholder="E-mail"
              handleChange={e => setEmail(e.target.value)}
            />

            <Form
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              handleChange={e => setPassword(e.target.value)}
            />

            <Form
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              handleChange={e => setConfirmPassword(e.target.value)}
            />

            <Button>Sign Up</Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }


export default withRouter(Signup);
