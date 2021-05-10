import React, { Component } from "react";
import AuthWrapper from "../AuthWrapper/AuthWrapper";
import Button from "../Forms/Button/Button";
import Form from "../Forms/FormInput/Form";
import "./emailPassword.scss";

import {auth} from './../../firebase/utils'
import { withRouter } from "react-router";

const initialState = {
  email: "",
  errors: []
};

class EmailPassword extends Component {

  state = {
    ...initialState,
  };

  handleChange = (e) => {
    const {name, value} = e.target

    this.setState({
        [name]:value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const {email, errors} = this.state
        const config = {
            url: "http://localhost:3000/login"
        }
        await auth.sendPasswordResetEmail(email, config)
        .then(() => {
            alert("Password has sent successfully")
            this.props.history.push("/login")
        })
        .catch(() => {
            const err = ["Email not Found!"];
            this.setState({
                errors: err
            })
        })
    } catch(err){

    }
  }

  render() {
    const { email, errors } = this.state;

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
                                <li style={{color:"red", textAlign:"center"}} key={index}>{e}</li>
                            )
                        })}
                    </ul>
                )
            }
          <form onSubmit={this.handleSubmit}>

            <Form 
                type="email"
                name="email"
                value={email}
                placeholder="E-mail"
                onChange={this.handleChange}/>

          <Button type="submit">Submit</Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}
export default withRouter(EmailPassword);
