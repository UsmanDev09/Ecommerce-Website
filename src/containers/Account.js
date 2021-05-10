import React,{useState}from 'react'
import {useHistory} from 'react-router-dom'
import account from '../icons/account.svg'
import {connect} from 'react-redux'
import "./Account.css"
import auth from './firebase'
import avatar from '../icons/avatar.svg'
function Account(props) {
    const [display,setDisplay] = useState('none');
    const history = useHistory();
    const image = document.querySelector(".account_Image")
    const [mouseHover,setMouseHover] = useState('none')
   
    return (
        <div>       
            <div className = "account">
            <img className = "account_Image"  onClick = {() => 
            {   
                
                setMouseHover(!mouseHover)
                
                
           
            }} src={account} alt = "account_logo">
            </img>
            {console.log(mouseHover)}
          
            {mouseHover && props.userEmail ? 
            <div style = {{display: mouseHover,  boxShadow: "0.4px 0.2px 3px black" , padding:"20px",zIndex:"100",position:"absolute",top:"100%",right:"10%",color:"white",backgroundColor:"black",width:"210px"}}>
            <div style = {{display:"flex",marginBottom:"10px"}}>
                <img style = {{height:"50px",width:"50px"}} src = {avatar}></img>
                <div style = {{display:"flex",flexDirection:"column"}}>
                <p>{props.userEmail}</p>
                <p style = {{color:"white",paddingLeft:"10px"}}>You are signed in</p>
                </div>
            </div>
            <button onClick = {() => auth.signOut()}style = {{width:"60%",backgroundColor:"white",color:"black", border:"none",height:"1.8em",cursor:"pointer"}} >Sign Out</button>
        </div>: null}
        {mouseHover === true && props.userEmail === null ? 
            <div style = {{  boxShadow: "0.4px 0.2px 3px black" , padding:"20px",zIndex:"100",position:"absolute",top:"100%",right:"10%",color:"white",backgroundColor:"black",width:"210px",height:"4em"}}>
                <img style = {{height:"50px",width:"50px",paddingRight:"10px"}} src = {avatar}></img>
                <button  onClick = {() => history.push('/Account')} style ={{position:"absolute",top:"40%",width:"60%",backgroundColor:"white",color:"black", border:"none",outline:"none",fontFamily:"monospace",height:"1.8em",cursor:"pointer",borderRadius:"0.3vw"}}>Sign In</button>
            </div>:null
        }
        </div>
     
           
        
     </div>

    )
}

const mapStateToProps = (state) => {
    return {
        userEmail : state.userEmail
    }
}   

export default connect(mapStateToProps)(Account)
