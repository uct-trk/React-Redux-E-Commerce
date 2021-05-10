import React from 'react'
import Button from '../Forms/Button/Button'
import './signin.scss'
import {signInWithGoogle} from './../../firebase/utils'

const Signin = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="signin">
            <div className="wrap">
                <h2>
                    LogIn
                </h2>
                <div className="formWrap">
                    <form onSubmit={handleSubmit}>
                        <div className="socialSignin">
                            <div className="row">
                                <Button onClick={signInWithGoogle}>
                                    Sign in with Google
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signin
