import { Fragment } from 'react'
import Account from './Account'
import Cart from './Cart';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import ShopNow from './ShopNow';
import Checkout from './Checkout';
import Nav from './Nav';
import OrderCompleted from './OrderCompleted';
import Hamburger from './Hamburger';
import Home from './Home';
import UserAccount from './UserAccount'
import SignUp from './SignUp'
import {useHistory} from 'react-router-dom'
import {database} from './firebase'
import store from '../redux/store'
const Main = (props) => {
    const history = useHistory()
    let initialState;
   
    
    return(
        
        <Fragment>
        <Router>
        <div style = {{height:"100vh",position:"absolute",width:"100%",zIndex:"100"}} >
            <div style = {{backgroundColor:"white",zIndex:"2",color:"white",width:"100%",position:"fixed",boxShadow:"#dad8d8 -0.5px 0px 1px 1px"}}>
                
                <div style = {{display:"flex",color:"white",flexDirection:"row",justifyContent:"space-between",margin: " 0% 5% 0 5%", width:"90%",height:"50px"}}>
            
                    <h2 onClick = {() => history.push("/Ecommerce-Website")} style = {{margin:"auto 0",color:"black",fontFamily:"sans-serif",fontSize: "20px",fontFamily:"-webkit-pictograph",cursor:"pointer"}}>ACTIVA</h2>
                    <Nav></Nav> 
                    
                    <Hamburger ></Hamburger>
                    <div style = {{display: "flex"}}>
                        <Account/>
                        <Cart></Cart>
                    </div>

                </div>
               
            </div>
            <Switch>
            <Route path = "/Ecommerce-Website" exact component = {Home}></Route>
                
                <Route path = "/ShopNow" exact component = {ShopNow}></Route>
                <Route path = "/Account" component = {UserAccount}></Route>
                <Route path = "/SignUp" component = {SignUp}></Route>
                
                <Route path = "/Checkout" component = {Checkout}></Route>
                
                <Route path = "/OrderCompleted" component = {OrderCompleted}></Route>:
            
                
            </Switch>
        </div>
        </Router>
        </Fragment>
            
            )
}
export default Main