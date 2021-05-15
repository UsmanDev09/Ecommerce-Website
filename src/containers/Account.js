import React,{useState,useEffect}from 'react'
import {useHistory} from 'react-router-dom'
import account from '../icons/account.svg'
import {connect} from 'react-redux'
import "./Account.css"
import auth from './firebase'
import avatar from '../icons/avatar.svg'
import store from '../redux/store'
function Account(props) {
    const [display,setDisplay] = useState('none');
    const history = useHistory();
    const image = document.querySelector(".account_Image")
    const [mouseHover,setMouseHover] = useState(false)
  
    return (
        
        <div>      
           
            <div className = "account">
            <img className = "account_Image"  onClick = {() => 
            {   
                
                setMouseHover(!mouseHover)
                
                
           
            }} src={account} alt = "account_logo">
            </img>
           
          
            {mouseHover && props.userEmail ? 
            <div style = {{display: mouseHover,  boxShadow: "0.4px 0.2px 3px black" , padding:"20px",zIndex:"100",position:"absolute",top:"100%",right:"10%",color:"white",backgroundColor:"white"}}>
            <div style = {{display:"flex",marginBottom:"10px"}}>
                <img style = {{height:"30px",width:"50px"}} src = {avatar}></img>
                <div style = {{display:"flex",flexDirection:"column"}}>
                <p style = {{color:"black",paddingLeft:"10px",fontFamily:"monospace",margin:"0"}}>{props.userName}</p>
               
                <p style = {{color:"black",paddingLeft:"10px",fontFamily:"monospace",marginBottom:"0"}}>{props.userEmail}</p>
                <p style = {{color:"black",paddingLeft:"10px",fontFamily:"monospace",marginBottom:"0",color:"#9c4343"}}>You are signed in</p>
                </div>
            </div>
            <button onClick = {() => {
                setMouseHover(!mouseHover)
                auth.signOut()
                history.push('/Ecommerce-Website')
            }}style = {{width:"60%",backgroundColor:"black",color:"white", border:"none",height:"1.8em",cursor:"pointer",fontFamily:"monospace"}} >Sign Out</button>
        </div>: null}
        {mouseHover === true && props.userEmail === null ? 
            <div style = {{ display: mouseHover, boxShadow: "0.4px 0.2px 3px black" , padding:"20px",zIndex:"100",position:"absolute",top:"100%",right:"10%",color:"black",backgroundColor:"white",width:"210px",height:"4em"}}>
                <img style = {{position:"relative",top:"15px",height:"30px",width:"50px",paddingRight:"10px"}} src = {avatar}></img>
                <button  onClick = {() => {
                    store.dispatch({
                        type: "PreviousLocation",
                        previousLocation: "Account_Icon"
                    })
                    setMouseHover(!mouseHover)
                    history.push('/Account')}} style ={{position:"absolute",top:"40px",width:"60%",backgroundColor:"black",color:"white", border:"none",outline:"none",fontFamily:"monospace",height:"1.8em",cursor:"pointer",borderRadius:"0.3vw"}}>Sign In</button>
            </div>:null
        }
        </div>
     
           
        
     </div>

    )
}

const mapStateToProps = (state) => {
    return {
        userEmail : state.userEmail,
        userName : state.userName
      
    }

}   

export default connect(mapStateToProps)(Account)
