import { Fragment } from 'react'
import Account from './Account'
import Cart from './Cart';
import {BrowserRouter as Router, Route,Switch,Link} from 'react-router-dom'
import ShopNow from './ShopNow';
import ViewCart from './ViewCart';
import Checkout from './Checkout';
import Nav from './Nav';
import OrderCompleted from './OrderCompleted';
import Hamburger from './Hamburger';
import Home from './Home';
import UserAccount from './UserAccount'
const Main = () => {
    return(
        
        <Fragment>
        <Router>
        <div style = {{height:"100vh",position:"absolute",width:"100%",zIndex:"100"}} >
            <div style = {{backgroundColor:"white",zIndex:"2",color:"white",width:"100%",position:"fixed",boxShadow:"-0.5px 0px 5px 1px grey"}}>
                
                <div style = {{display:"flex",color:"white",flexDirection:"row",justifyContent:"space-between",margin: " 2% 5% 0 5%", width:"90%",height:"50px"}}>
            
                    <h2 style = {{margin:"auto 0",color:"black",fontFamily:"sans-serif"}}>ACTIVA</h2>
                    <Nav></Nav> 
                    
                    <Hamburger ></Hamburger>
                    <div style = {{display: "flex"}}>
                        <Account/>
                        <Cart></Cart>
                    </div>

                </div>
            
            </div>
            <Switch>
            <Route path = "/" exact component = {Home}></Route>
                
                <Route path = "/ShopNow" exact component = {ShopNow}></Route>
                <Route path = "/Account" component = {UserAccount}></Route>
                <Route path = "/Cart" component = {ViewCart}></Route>
                <Route path = "/Checkout" component = {Checkout}></Route>
                
                <Route path = "/OrderCompleted" component = {OrderCompleted}></Route>:
            
                
            </Switch>
        </div>
        </Router>
        </Fragment>
            
            )
}


export default Main;