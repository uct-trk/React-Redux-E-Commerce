import React, { useState, useEffect } from "react";
import AuthWrapper from "../AuthWrapper/AuthWrapper";
import Button from "../Forms/Button/Button";
import Form from "../Forms/FormInput/Form";
import "./emailPassword.scss";
import { useHistory } from "react-router-dom";
import {resetPasswordStart, resetUserState} from './../../redux/actions/userActions'
import { useSelector, useDispatch } from "react-redux";

const mapState = ({user}) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr
}) 

const EmailPassword = (props) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const {resetPasswordSuccess, userErr} = useSelector(mapState)

  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if(resetPasswordSuccess){
      dispatch(resetUserState())
      history.push("/login")
    }
  }, [resetPasswordSuccess])

  useEffect(() => {
    if(Array.isArray(userErr) && userErr.length > 0){
      setErrors(userErr)
    }
  }, [userErr])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(resetPasswordStart({email}))

    
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

export default EmailPassword;
