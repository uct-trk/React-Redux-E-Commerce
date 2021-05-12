import React, {useState, useEffect} from "react";
import Button from "../Forms/Button/Button";
import { useDispatch, useSelector } from 'react-redux'
import {emailSignInStart, googleSignInStart} from './../../redux/actions/userActions'
import "./signin.scss";

import Form from "../Forms/FormInput/Form";
import AuthWrapper from "../AuthWrapper/AuthWrapper";
import { Link, useHistory } from "react-router-dom";

const mapState = ({user}) => ({
  currentUser: user.currentUser
})

const Signin = (props) => {

    const {currentUser} = useSelector(mapState)
    const dispatch = useDispatch()
    const history = useHistory()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    
    useEffect(() => {
      if (currentUser){
        resetForm()
        history.push("/")
      }
    }, [currentUser])

    // clear password and email inputs - sifre ve email bölümünü temizler
    const resetForm = () => {
        setEmail("");
        setPassword("")
    }

   const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({email, password}))  
  };

  //open with google account - google ile oturum acmak için
  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  }

    const configAuthWrapper = {
        headline: "Login"
    }

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          <form onSubmit={handleSubmit}>
            <Form
              placeholder="E-mail"
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Form
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Button type="submit">Login</Button>
            <div className="socialSignin">
              <div className="row">
                <Button className="google-sign" onClick={handleGoogleSignIn}>
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


export default Signin;
