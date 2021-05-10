import React, {useState} from "react";
import Button from "../Forms/Button/Button";
import "./signin.scss";
import { auth, signInWithGoogle } from "./../../firebase/utils";
import Form from "../Forms/FormInput/Form";
import AuthWrapper from "../AuthWrapper/AuthWrapper";
import { Link, withRouter } from "react-router-dom";



const Signin = (props) => {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    // sifre ve email bölümünü temizler
    const resetForm = () => {
        setEmail("");
        setPassword("")
    }

   const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm()
      props.history.push("/")
    } catch (err) {}
  };

  



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


export default withRouter(Signin);
