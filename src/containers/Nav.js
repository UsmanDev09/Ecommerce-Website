import {Link} from 'react-router-dom';
import styles from './Nav.module.css'
import {connect} from 'react-redux';
import store from '../redux/store';
const styledList = window.innerWidth > 1000? {
    listStyleType : "none",
    textDecoration: "none",
    color:"black",
    margin:"0.1rem 1.1rem",
    lineSpacing: "0.05em",
    fontWeight:"600",
    fontSize:"1.1rem"
}: {
    listStyleType : "none",
    textDecoration: "none",
    color:"black",
    margin:"0.1rem 1.1rem",
    lineSpacing: "0.05em",
    fontWeight:"400",
    fontSize:"1.1rem"
} 
const Nav  = (props) => {
    const onCloseHamburger = () => {
        store.dispatch({
            type : "Toggle",
            toggle: !store.getState().toggle
        })
    }
    return( 
        
        
        <ul style = {{width: props.toggle? '40%' : '' }} className = {styles.nav_wrapper}>
            <Link to = "/" style = {styledList}>
                <li style = {{fontSize:"1.3em"}}>Home</li>
            </Link>
            {/* <Link to = "/About" style = {styledList}>
                <li style = {{fontSize:"1.3em"}}>About</li>
            </Link> */}
            <Link to = "/ShopNow" style = {styledList}>
                <li style = {{fontSize:"1.3em"}}>ShopNow</li>
            </Link>
            {/* <Link to = "/ContactUs" style = {styledList}>
                <li style = {{fontSize:"1.3em",width:"150%"}}>Contact Us</li>
            </Link> */}
            <div style = {{display: props.toggle? 'block' : 'none' }} onClick = {onCloseHamburger} className = {styles.closeBtn}>
             
            </div>
        </ul>
    )
}
const mapStateToProps = (state) => {
   return { toggle : state.toggle}
}
export default connect(mapStateToProps)(Nav);