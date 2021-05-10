import Nav from './Nav'
import React,{useRef,useState} from 'react'

import {useHistory} from 'react-router-dom'
import "./UserAccount.css"
import auth from './firebase'

function UserAccount() {
    const [error,setError] = useState('')
    const history = useHistory()
    
    const userNameRef = useRef(null)
    
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const onSignIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value

        ).then((userAuth) => {
           userAuth.user.updateProfile({
               displayName : userNameRef.current.value 
           })
            history.push("/")
        }).catch((error) => setError(error.message))

    }
    

    const register = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value

        ).catch((error) => setError(error.message))
    }


    return (
        <div className = "userAccount">
            <div className = "userAccount_body">
                <h1>Sign In</h1>

                <input ref ={userNameRef} type ="input" placeholder = "Name">

                </input>

               
                <input ref = {emailRef} type = "email" placeholder = "Enter Email">

                </input>
                <input ref = {passwordRef} type = "password" placeholder = "Enter Password">

                </input>
                <button className = "userAccount_signInBtn" onClick = {onSignIn} type = "submit">Sign In</button>
                <h4><span className = "userAccount_notRegisterd">Not registered? </span><span className = "userAccount_signUp" onClick ={register}>Sign Up here</span></h4>
                <p className = "userAccount_error">{error}</p>
                <button className = "userAccount_guestBtn"onClick = {() => history.push('/Checkout')} >Continue as a Guest</button>
            </div>
        </div>
    )
}

export default UserAccount
