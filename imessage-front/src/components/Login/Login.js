import React from 'react'
import './Login.css'
import Button from '@material-ui/core/Button';
import { auth, provider } from '../../firebase'
const Login = () => {

    const signIn = () => {
        auth.signInWithPopup(provider).catch((err) => {
            alert(err.message)
        })
    }

    return (
        <div className="login">
            <div className="login__logo">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/IMessage_logo.svg"
                    alt=""
                />
                <h1>iMessage</h1>
            </div>
            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login;
