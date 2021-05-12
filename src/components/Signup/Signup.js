import React, {useState, useEffect} from "react";
import {signUpUserStart} from './../../redux/actions/userActions'
import { useDispatch, useSelector } from "react-redux";
import Button from "../Forms/Button/Button";
import Form from "../Forms/FormInput/Form";
import "./signup.scss";

import AuthWrapper from "../AuthWrapper/AuthWrapper";
import { useHistory } from "react-router-dom";


const mapState = ({user}) => ({
  currentUser: user.currentUser,
  userErr: user.userErr
})

const Signup = (props) => {

  const {currentUser, userErr} = useSelector(mapState)

  const dispatch = useDispatch()
  const history = useHistory()

  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState([])

  // when sign up success kayıt olma işlemi başarılı oldugu zaman
  useEffect(() => {
    if(currentUser){
      reset();
      props.history.push("/")
    }
  }, [currentUser])

  // when sign up error kayıt olma hata verdiği zaman
  useEffect(() => {
    if(Array.isArray(userErr) && userErr.length > 0){
      setErrors(userErr)
    }
  }, [userErr])

  const reset = () => {
    setDisplayName('')
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setErrors([])
  } 

 
  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(signUpUserStart({
      displayName,
      password,
      confirmPassword,
      email
    }))
    
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


export default Signup;
