import {Link} from 'react-router-dom';
import styles from './Main.module.css';
const Home = () => {
    return(
            <div style = {{width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignContent:"center"}}>
                <Link to = "/ShopNow" className = {styles.btn} style ={{textDecoration:"none",color:"black",margin:"auto 0", border:"1px solid black", minHeight:"3em"}}><p style = {{textAlign:"center",fontSize:"15px",width:"300px"}}>Shop Our New Collection</p></Link>
            </div>
    )
    }
export default Home;