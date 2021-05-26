import store from '../redux/store';
import styles from './Hamburger.module.css';
const Hamburger = () => {

    const handleHamburger = () => {
        store.dispatch({
            type: "Toggle",
            toggle: !store.getState().toggle
        })
    }
   
    return(
        <div className = {styles.hamburger_Wrapper} onClick = {handleHamburger}>
        <div  className  = {styles.hamburger}></div>
        </div>
    )
}

export default Hamburger;