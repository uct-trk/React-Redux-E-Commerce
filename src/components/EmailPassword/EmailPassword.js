import React, { useState, useEffect } from "react";
import AuthWrapper from "../AuthWrapper/AuthWrapper";
import Button from "../Forms/Button/Button";
import Form from "../Forms/FormInput/Form";
import "./emailPassword.scss";
import { withRouter } from "react-router";
import {resetPassword, resetAllAuthForms} from './../../redux/actions/userActions'
import { useSelector, useDispatch } from "react-redux";

const mapState = ({user}) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError
}) 

const EmailPassword = (props) => {

  const {resetPasswordError, resetPasswordSuccess} = useSelector(mapState)
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if(resetPasswordSuccess){
      dispatch(resetAllAuthForms())
      props.history.push("/login")
    }
  }, [resetPasswordSuccess])

  useEffect(() => {
    if(Array.isArray(resetPasswordError) && resetPasswordError.length > 0){
      setErrors(resetPasswordError)
    }
  }, [resetPasswordError])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(resetPassword({email}))

    
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
