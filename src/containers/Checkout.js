import { Fragment } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import {connect} from 'react-redux'
import store from '../redux/store';
import {Link} from 'react-router-dom';
import styles from './Checkout.module.css'
const Checkout = (props) => {
    
    const enterFirstName = (e) => {
       
        store.dispatch({
            type: "CustomerFirstName",
            customerFirstName : e.target.value
        })
    }

    const enterLastName = (e) => {
       
        store.dispatch({
            type: "CustomerLastName",
            customerLastName : e.target.value
        })
    }
    
    const onOrderComplete = () => {
        
        if(props.lastNameError === "" && props.firstNameError === "" && props.EmailError === "" && props.phoneErrorMessage === ""){
          
            if(props.selectedCountry !== ""){
                store.dispatch({
                    type : "FormSubmission",
                    verified : "true",
                    formSubmissionError: "",
                    countryError : ""
                })
            
            }else{
            store.dispatch({
                type : "FormSubmission",
                verified : "false",
                formSubmissionError: "Please fill all the required fields",
                countryError : "Please select a Country"
            })
        }
        
    }else{
        store.dispatch({
            type : "FormSubmission",
            verified : "false",
            formSubmissionError: "Please fill all the above fields",
            
        })
    }
}
    const verifyFirstName = (e) => {
        if(e.target.value.length >1 ){
            if((e.target.value > 'a' && e.target.value < 'z') || (e.target.value > 'A'  && e.target.value < 'Z')){
                store.dispatch({
                    type: "FirstNameError",
                    firstNameError : "",
                
                })

            }else{
                store.dispatch({
                    type: "FirstNameError",
                    firstNameError : "Please Enter a Valid First Name",
                  
                })
            }
           
    }else{
        store.dispatch({
            type: "FirstNameError",
            firstNameError : "Please Enter a Valid First Name",
          
        })
    }
    }
    const verifyLastName = (e) => {
        if(e.target.value.length >1 ){
            if((e.target.value > 'a' && e.target.value < 'z') || (e.target.value > 'A'  && e.target.value < 'Z')){
                store.dispatch({
                    type: "LastNameError",
                    lastNameError : ""
                })

            }else{
                store.dispatch({
                    type: "LastNameError",
                    lastNameError : "Please Enter a Valid Last Name"
                })
            }
            
    }else{
        store.dispatch({
            type: "LastNameError",
            lastNameError : "Please Enter a Valid Last Name"
        })
    }
    }

    const verifyAddress = (e) => {
       if( e.target.value.length  > 3) {
           store.dispatch({
               type : "VerifyAddress",
               addressError: ""
           })
       }else{
        store.dispatch({
            type : "VerifyAddress",
            addressError: "Please enter a valid Address"
        })
       }
    }
    const verifyEmail = (e) => {
       
        if(e.target.value.length > 8){
            if(e.target.value.includes("@")){
                
                store.dispatch({
                    type: "EmailError",
                    EmailError: "",
                   
                })
            }else{
                
                store.dispatch({
                    type: "EmailError",
                    EmailError : "Please give a valid email address",
                 
                })
            }
             if(e.target.value.includes(".com")){
                
                store.dispatch({
                    type: "EmailError",
                    EmailError : "",
                   
                })
            }else{
                
                store.dispatch({
                    type: "EmailError",
                    EmailError : "Please give a valid email address",
                 
                })
            }
        }
        else{
            store.dispatch({
                type: "EmailError",
                EmailError : "Please give a valid email address",
               
            })
        }
    }

    const enterEmail = (e) => {
       console.log("e",e.target.value === null)
        store.dispatch({
            type: "CustomerEmail",
            customerEmail : e.target.value
        })
    }
    const selectCountry = (val) => {
        store.dispatch({
            type: "CountrySelected",
            selectedCountry : val
        })
      
    }
    
    const selectRegion = (val) => {
        store.dispatch({
            type: "RegionSelected",
            selectedRegion : val
        })
        
    
    }
    const enterPhoneNumber = (e) => {
        store.dispatch({
            type: "PhoneNumber",
            phoneNumber : e.target.value
        })
      
    }

    const verifyPhoneNumber = (e) => {
       
        if(e.target.value.slice(0,2) === "03" && e.target.value.length === 11){
         
            store.dispatch({
                type: "PhoneNumberError",
                phoneErrorMessage : ""
             
            })


        }else if(e.target.value.slice(0,3) === "+92" && e.target.value.length === 13){
        
            store.dispatch({
                type: "PhoneNumberError",
                phoneErrorMessage : ""
               
            })
        
        }else {
            store.dispatch({
                type: "PhoneNumberError",
                phoneErrorMessage : "Please give a valid mobile number"
               
            })
        }

    }
    const enterAddress = (e) => {
        store.dispatch({
            type: "Address",
            Address : e.target.value
        })
      
    }


return (
    <Fragment>
    <div style = {{paddingBottom:"20px"}}>
    <div style = {{display:"flex",width :"100%",height:"100%",justifyContent:"flex-end",flexWrap:"wrap"}}>
    <form style = {{display:"flex",flexDirection:"column",position:"relative",top:"20%",margin:window.innerWidth >1000? "10% 0%":"20% 10%",width:window.innerWidth > 1000? '45%': '100%'}}>
        <div style = {{width:"80%"}}>
        <div className = {styles.formGroup}>
           
            <input name="firstName" autoComplete = "off" placeholder="First Name" required className  = {styles.formControl} value = {props.customerFirstName} type = "text" onChange = { enterFirstName} onBlur = {verifyFirstName}></input>
            <p style = {{ position:"relative", top:"80%", color:"red", fontSize:"14px"}}>{props.firstNameError}</p>
        </div> 

        <div className = {styles.formGroup}>
           
            <input name="lastName" autoComplete = "off" placeholder="Last Name" required className  = {styles.formControl} value = {props.customerLastName} type = "text" onChange = { enterLastName} onBlur = {verifyLastName}></input>
            <p style = {{ position:"relative", top:"80%", color:"red",fontSize:"14px"}}>{props.lastNameError}</p>
        </div> 
        
        <div className = {styles.formGroup}>    
            
            <input className = {styles.formControl}autoComplete = "off" placeholder="Email Address" required value = {props.customerEmail} type = "text" onChange = { enterEmail} onBlur = {verifyEmail} type = "text"></input>
            <p style = {{ position:"relative", top:"80%", color:"red",fontSize:"14px"}}>{props.EmailError}</p>
            </div>
        
        <div className = {styles.formGroup}>
          
            <input className = {styles.formControl} autoComplete = "off" placeholder="Address" required value = {props.customerAddress} type = "text" onChange = { enterAddress} onBlur = {verifyAddress} type = "text"></input>
            <p style = {{ position:"relative", top:"80%", color:"red",fontSize:"14px"}}>{props.addressError}</p>
        </div>
            
            
            <CountryDropdown value = {props.selectedCountry} onChange = { (val) => selectCountry(val)} style = {{height: "2em",
            width:"105%",            
            transition: "translateX 6s ease-in",
            marginBottom:"15px",
            fontSize: "14px",
            border: "1px solid rgb(209, 209, 209)",
            borderRadius: "5px",
            paddingLeft : "20px"}}></CountryDropdown>
            <p style = {{ position:"relative", top:"80%", color:"red",fontSize:"14px"}}>{props.countryError}</p>
            <RegionDropdown
            style = {{height: "2em",
            width:"105%",            
            transition: "translateX 6s ease-in",
            margin:"15px 0",
            fontSize: "14px",
            border: "1px solid rgb(209, 209, 209)",
            borderRadius: "5px",
            paddingLeft : "20px"}}
            country={props.selectedCountry}
            value={props.selectedRegion}
            onChange={(val) => selectRegion(val)} />

        <div style = {{margin: "15px 0"}} className = {styles.formGroup}>   
            
            <input className = {styles.formControl} autoComplete = "off" placeholder = "Mobile Number" required value = {props.phoneNumber} type = "text" onChange = { enterPhoneNumber} onBlur = {verifyPhoneNumber} type = "text"></input>  
            <p style = {{ position:"relative", top:"90%", color:"red",fontSize:"14px"}}>{props.phoneErrorMessage}</p>
        </div>
           
            
        <div style = {{display:"flex",alignContent:"center"}}>
            
            <input checked type = "checkbox" style = {{height:"18px"}}></input>
            <label style = {{margin:"0 10px"}}>Cash on Delivery</label>
        </div>     

        <Link onClick = {onOrderComplete} to = {props.verified === "true" ? "/OrderCompleted" : "/Checkout"} style = {{display : window.innerWidth > 1000 ? "flex": "none",position:"relative",top:"10px",color:"white",backgroundColor:"black",width:window.innerWidth > 500 ? "50%" : "60%",height:"2em",justifyContent:"space-around",alignItems:"flex-start",textDecoration:"none",fontFamily:"monospace",fontSize:"1.2rem",margin:"40px auto", marginBottom:"40px"}}><p style ={{margin:"auto 0"}}>Place Order</p></Link>   
        <p style = {{ margin:"0",textAlign : "center", color:"red"}}>{props.formSubmissionError}</p>
   
        </div>
    </form>
   
    <aside style ={{backgroundColor: "#e1e1e1",width:window.innerWidth > 1000? "50%": "100%",minHeight:"100vh",height:"auto",position:"relative",top:"8%",paddingBottom:window.innerWidth > 1000? "80px": "0"}}>
        <div style ={{}}>

            <div className = "order" style = {{ color:"black",margin:window.innerWidth > 1000 ? "20% 0" : "5% 0%"}}>
                {props.productName.map((element,index) => {
                    let imageRef = props.productImage[index]
                    let productQuantityRef = props.productQuantity[index]
                    let productPriceRef = props.productPrice[index]
                   return(
                <div style ={{display:"flex", margin:"0 10%",height:"100px"}}>
                   <img src ={process.env.PUBLIC_URL + imageRef} style ={{width:"70px",height:"70px",margin:"0 0px",marginRight:"40px"}}></img>

                   <p style = {{fontFamily:"monospace",marginLeft:" 0px",fontWeight:"bold",fontSize:"14px"}}>{element}</p>
                    <p style = {{fontFamily:"monospace",marginLeft:" 60px",fontSize:"14px"}}>{productQuantityRef}</p>
                    <p style = {{fontFamily:"monospace",marginLeft :" 60px",fontSize:"14px"}}>{productPriceRef}</p>     
                </div>)
                })}
                
            </div>
            <div style = {{margin:"0% 10%",width:"auto", height:"200px"}}>
                <hr></hr>
                <div style = {{display:"flex",width:"100%",justifyContent:"space-between"}}>
                <h4>Subtotal: </h4>
                <h4>{props.subTotal}</h4>
                </div>
                <div style = {{display:"flex",width:"100%",justifyContent:"space-between"}}>
                <h4>Shipping: </h4>
                <h4>0</h4>
                </div>
                <hr></hr>
                <div style = {{display:"flex",width:"100%",justifyContent:"space-between"}}>
                <h4>Total</h4>
                <h4>{props.subTotal}</h4>
                </div>
                </div>

        </div>
    </aside>
    </div>
    <Link onClick = {onOrderComplete} to = {props.verified === "true" ? "/OrderCompleted" : "/Checkout"} style = {{display : window.innerWidth < 1000 ? "flex": "none",position:"relative",top:"10px",color:"white",backgroundColor:"black",width:window.innerWidth > 500 ? "50%" : "60%",height:"2em",justifyContent:"space-around",alignItems:"flex-start",textDecoration:"none",fontFamily:"monospace",fontSize:"1.2rem",margin:"40px auto", marginBottom:"40px"}}><p style ={{margin:"auto 0"}}>Place Order</p></Link>   
        <p style = {{ margin:"0",textAlign : "center", color:"red"}}>{props.formSubmissionError}</p>
    </div>
    </Fragment>
)
}
const mapStateToProps = (state) => {
  console.log(state)
    return{
        selectedCountry : state.selectedCountry,
        selectedRegion : state.selectedRegion,
        customerFirstName : state.customerFirstName  ,
        customerLastName : state.customerLastName,
        customerEmail:  state.customerEmail,
        EmailError : state.EmailError,
        phoneNumber : state.phoneNumber,
        phoneErrorMessage: state.phoneErrorMessage,
        firstNameError : state.firstNameError,
        lastNameError : state.lastNameError,
        Address : state.Address,
        productImage : state.productImage,
        productName : state.productName,
        productQuantity : state.productQuantity,
        productPrice : state.productPrice,
        subTotal: state.subTotal,
        formSubmissionError: state.formSubmissionError,
        verified : state.verified,
        addressError : state.addressError,
        signUpEmail : state.userEmail,
        countryError : state.countryError
    }
}

export default connect(mapStateToProps)(Checkout)

