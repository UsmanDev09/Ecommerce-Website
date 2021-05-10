
import { useState,Fragment, useEffect } from 'react';
import cartIcon from '../icons/shopping-cart.png';
import {BrowserRouter as Router,Link,Route, StaticRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styles from './Cart.module.css'
import store from '../redux/store'
import UserAccount from './UserAccount'
const CartDetails = (props) => {
    const user = props.userEmail
    let imageMutate,quantityMutate,priceMutate,productId;
    const onCloseCart = () => {
        
        store.dispatch({
            type:"ClickCart",
            toggleCart: !store.getState().toggleCart
        })
    }
    const onRemoveProduct = (name,id) =>{
       
        store.dispatch({
            type : "RemoveProduct",
            productName : name,
            id: id
        })
    }

    const onIncreaseQuantity = (name,productId) =>{
        console.log("dispatch id",productId)
        store.dispatch({
            type : "IncreaseQuantity",
            productName : name,
            productId: productId
        })
    }

    const onDecreaseQuantity = (name,id) =>{
        store.dispatch({
            type : "DecreaseQuantity",
            productName : name,
            productId :id
        })
    }
    const styledCartButton = {
        listStyleType : "none",
        textDecoration: "none",
        color:"black",
        margin:"1rem 0rem",
        lineSpacing: "0.05em",
        fontWeight:"600",
        fontSize:"1.1rem",
        textAlign:"center",
        height: "2em",
        display:"flex",
        justifyContent:"center",
        border: "1px solid black",
      
    }

    const styledCheckoutButton = {
        listStyleType : "none",
        textDecoration: "none",
        paddingTop:"12px",
        margin:"1rem 0rem",
        lineSpacing: "0.05em",
        fontWeight:"100",
        fontSize:"1.1rem",
        textAlign:"center",
        backgroundColor:"black",
        color:"white",
        width:"100%",
        height:"2em",
        fontFamily: "monospace",
        cursor:"pointer"
    }
    if(props.product_name.length === 0 ){

        return (
            <div style = {{height:"100vh", overflow:"scroll",color:"black"}}>
            <h5 style = {{marginLeft: "5px"}}>My Bag ({props.totalQuantity})</h5>
            <div>
                <div onClick = {onCloseCart} className = {styles.closeBtn}></div>
            </div>
                <h5>Your Cart is Empty</h5>
            </div>
        )
    }else{
        console.log("ss",props.product_name, props.productName)
 return(
     
        <div style = {{height:"100vh", overflow:"scroll",color:"black"}}>
            <h5 style = {{marginLeft: "5px"}}>My Bag ({props.totalQuantity})</h5>
            <div>
                <div onClick = {onCloseCart} className = {styles.closeBtn}></div>
            </div>
        {props.product_name.map((element,index) => {
            
            imageMutate = props.productImage[index];
            priceMutate = props.productPrice[index];
            quantityMutate = props.productQuantity[index]; 
            productId = props.productId[index];
           console.log("productId",productId,"element",element)
            return(
           
            <div style = {{margin:"0 50px"}}>
                    
            <div style = {{display:"flex",justifyContent:"space-around"}}>
               
               
                <div>
                    <img src = {process.env.PUBLIC_URL +imageMutate} style = {{width:"100px",height:"100px"}}></img>
                </div>
                <div style = {{textAlign:"right"}}>
                    <p style = {{fontFamily: "monospace"}}>{element}</p>
                    <p style = {{fontFamily: "monospace"}}>S </p>
                    < p style = {{fontFamily: "monospace"}}> {quantityMutate} * {priceMutate}</p>
                </div>
              
                
                
               
            </div>
            <div style = {{display:"flex", justifyContent:"flex-end"}}>
            <button onClick = {() => onIncreaseQuantity(element,productId)} style = {{backgroundColor:"black",color:"white",margin: " 1px 5px", border:"none", width:"20px",cursor:"pointer"}}>+</button>
            <button onClick = { () => onDecreaseQuantity(element,productId)}style = {{backgroundColor:"black",color:"white", border:"none",margin: " 1px 5px",  width:"20px",cursor:"pointer"}}> -</button>    
            </div>
            <button onClick = {() => onRemoveProduct(element,productId)} style = {{width:"100%", border:"none",backgroundColor:"black", color:"white",height:"1.75em", fontFamily:"monospace",cursor:"pointer"}}>Remove Product</button>
            <hr style = {{width: "70%",height:"1px", backgroundColor:"black",opacity:"0.5"}}></hr>
            </div>
            
        
        )})
            
        }
        <div style={{display:"flex",flexDirection:"column"}}>
            
            {/* <Link to="/Cart" style = {styledCartButton} ><p style = {{margin:"3px",textAlignLast:"center"}}>View Shoping Bag</p></Link> */}
            { !user?  <Link to = "/Account" style = {styledCheckoutButton} onClick = {onCloseCart}> Proceed to Checkout</Link> : 
                <Link to="/Checkout" style = {styledCheckoutButton} onClick = {onCloseCart}><p style = {{margin:"3px",textAlignLast:"center"}}>Proceed To Checkout</p></Link>
            }
              
        </div>
        </div>
    )
    }
    
}
const Cart = (props) => {
    const [toggle,setToggle] = useState('false')
        const onCartClick = () => {
               store.dispatch({
                   type: "ClickCart",
                   toggleCart: !store.getState().toggleCart
               })
        }
   
    const cartStyle  = window.innerWidth > 1000?  {
        width:"40px",
        height:"50px",
        cursor:"pointer",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    }:
    {
        position:"relative",
        right:"9%",
        width:"40px",
        height:"50px",
        cursor:"pointer",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    }
    

    return(
        <Fragment>
          
        <div onClick ={onCartClick} className = {styles.cartStyle} >
            <img src = {cartIcon} style = {{height:"40px",width:"40px",margin:"auto 0"}}alt = "cart" ></img>
            <p style = {{fontSize:"15px",color:"black"}}>({props.quantity})</p>
        </div>
        <div style = {{position:"absolute",top:"0",right:"0",height:"100vh",backgroundColor:"white", visibility:props.toggleCart ? "visible":"hidden", opacity: props.toggleCart? "1":"0", transition: "visibility 0s, opacity 0.5s linear"}}>
            <CartDetails userEmail = {props.userEmail} product_name = { props.productName} productPrice = {props.productPrice} productImage = {props.productImage} productQuantity  = {props.productQuantity} totalQuantity = {props.quantity}  productId = {props.productId}toggleCart ={props.toggleCart}></CartDetails>
        </div>
        </Fragment>
    )
}
const mapStateToProps = (state) => {
    console.log(state.productName)
    return {
         
    
            quantity : state.quantity, 
            productName:  state.productName,
            productImage : state.productImage,
            productQuantity : state.productQuantity,
            toggleCart : state.toggleCart,
            productPrice : state.productPrice,
            productId: state.productId,
            userEmail : state.userEmail
       
    }
}

export default connect(mapStateToProps)(Cart)