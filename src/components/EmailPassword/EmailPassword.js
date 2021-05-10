import React, { Component, useState } from "react";
import AuthWrapper from "../AuthWrapper/AuthWrapper";
import Button from "../Forms/Button/Button";
import Form from "../Forms/FormInput/Form";
import "./emailPassword.scss";

import { auth } from './../../firebase/utils'
import { withRouter } from "react-router";


const EmailPassword = (props) => {

  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const config = {
        url: "http://localhost:3000/login"
      }
      await auth.sendPasswordResetEmail(email, config)
        .then(() => {
          alert("Password has sent successfully")
          props.history.push("/login")
        })
        .catch(() => {
          const err = ["Email not Found!"];
          setErrors(err)
        })
    } catch (err) {

    }
  }

  const configAuthWrapper = {
    headline: "Send Password",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {
          errors.length > 0 && (
            <ul>
              {errors.map((e, index) => {
                return (
                  <li style={{ color: "red", textAlign: "center" }} key={index}>{e}</li>
                )
              })}
            </ul>
          )
        }
        <form onSubmit={handleSubmit}>

          <Form
            type="email"
            name="email"
            value={email}
            placeholder="E-mail"
            onChange={e => setEmail(e.target.value)} />

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default withRouter(EmailPassword);
