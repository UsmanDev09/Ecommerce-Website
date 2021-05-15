import store from '../redux/store';
import styles from './Hamburger.module.css';
const Hamburger = () => {

    const handleHamburger = () => {
        store.dispatch({
            type: "Toggle",
            toggle: !store.getState().toggle
        })
    }
    const hamBurgerStyle = window.innerWidth > 1000? {
        cursor:"pointer",
        height:"30px",
        width:"30px",
        position:"absolute",
        right:"5%",
        display:"none",
        outline:"none"
    }:
    {cursor:"pointer",
        height:"30px",
        width:"30px",
        position:"absolute",
        right:"5%",
        display:"block",
        outline:"none"
    }
    return(
        <div style = {hamBurgerStyle} onClick = {handleHamburger}>
        <div  className  = {styles.hamburger}></div>
        </div>
    )
}

export default Hamburger;