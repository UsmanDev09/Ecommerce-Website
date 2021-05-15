import React,{useRef,useState} from 'react'
import {useHistory} from 'react-router-dom'
import auth from './firebase'
import store from '../redux/store'
import "./SignUp.css"
function SignUp() {
    const userNameRef = useRef()
    const emailRef = useRef()
    const mobileNumberRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()
    const [error,setError] = useState()
    const register = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((userAuth) => {
                userAuth.user.updateProfile({
                    displayName : userNameRef.current.value,
                    phoneNumber : mobileNumberRef.current.value
                })
                store.dispatch({
                    type: "login",
                    userEmail : emailRef.current.value,
                    userName : userNameRef.current.value,
                    userMobileNumber : mobileNumberRef.current.value
                })
                history.push("/Ecommerce-Website")
        }).catch((error) => setError(error.message))
    }
    
    return (
        <div className = "SignUp">
            <div className = "signUp_body">
                <h1>Sign Up</h1>

                <input ref = {userNameRef} type ="input" placeholder = "Enter Name">

                </input> 
                <input ref = {mobileNumberRef} type ="input" placeholder = "Enter Mobile Number">

                </input> 
               
                <input ref = {emailRef} type = "email" placeholder = "Enter Email">

                </input>
                <input ref = {passwordRef} type = "password" placeholder = "Enter Password">

                </input>
                <p className = "signUp_error">{error}</p>
                <button  onClick = {register} className = "signUp_signUpBtn">Sign Up</button>
                
                <h4><span className = "signUp_haveAccount">Already have an account? </span><span className = "signUp_signInBtn" onClick ={() => history.push("/Account")}>Sign In here</span></h4>
   
            </div>
        </div>
    )
}

export default SignUp
