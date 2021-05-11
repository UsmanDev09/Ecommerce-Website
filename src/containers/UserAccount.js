import Nav from './Nav'
import React,{useRef,useState} from 'react'

import {useHistory} from 'react-router-dom'
import "./UserAccount.css"
import auth from './firebase'
import {googleProvider} from './firebase'
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
    
    const signInWithGoogle = () => {
       
            auth.signInWithPopup(googleProvider)
            .then((userAuth) => {
                userAuth.user.updateProfile({
                    displayName : userNameRef.current.value 
                })
                history.push("/")
            }).catch((error) => {
              
            }).catch((error) => setError(error.message))
          
    }
    const register = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value

        ).catch((error) => setError(error.message))
    }
    const onForgotPassword = () => {
    
            auth.sendPasswordResetEmail(emailRef.current.value)
            .then(setError("kindly check your email to reset your password"))
            .catch(error => setError(error.message))
        
    
    }

    return (
        <div className = "userAccount">
            <div className = "userAccount_body">
                <h1>Sign In</h1>

                {/* <input ref ={userNameRef} type ="input" placeholder = "Name">

                </input> */}

               
                <input ref = {emailRef} type = "email" placeholder = "Enter Email">

                </input>
                <input ref = {passwordRef} type = "password" placeholder = "Enter Password">

                </input>
                <p className = "userAccount_error">{error}</p>
                <button className = "userAccount_signInBtn" onClick = {onSignIn} type = "submit">Sign In</button>
                <h4 ><span className = "userAccount_forgotPassword" onClick = {onForgotPassword}>Forgot Password </span></h4>
                <h4><span className = "userAccount_notRegisterd">Not registered? </span><span className = "userAccount_signUp" onClick ={register}>Sign Up here</span></h4>
                
                <button className = "userAccount_googleSignIn" onClick = {signInWithGoogle}>
                   <img style = {{width:"25px",height:"25px"}} src="data:image/png;base64,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"></img> 
                    <p>Sign In with Google</p>
                </button>
                <button className = "userAccount_guestBtn" onClick = {() => history.push('/Checkout')} >Continue as a Guest</button>
                
               
            </div>
        </div>
    )
}

export default UserAccount
