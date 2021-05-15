
import store from '../redux/store';
import { connect } from 'react-redux';
const Products = (props) => {
    
    
    const onCartClickHandler = (product) => {
        
      store.dispatch({
          type: "addToCart",
          quantity:  localStorage.getItem('quantity')
      })
      
      store.dispatch({
          type : "addProduct",
          productName: props.productname,
          productQuantity: 1,
          productImage : props.image,
          productPrice : props.productprice,
          productQuantityRemaining: props.productQuantityRemaining,
          productId : props.productId
      })
     
        
      
     
    }

    return(
        <div style = {{display:"flex",flexDirection:"column",margin:" 2.5% 5%"}}>

        <img src = {process.env.PUBLIC_URL + props.image} style = {{width:"200px",height:"200px"}}alt = "product"></img>
        {props.updatedproductQuantityRemaining[props.productId] === "0"? <button disabled = "disabled"onClick = {() => onCartClickHandler(props.productname)} style = {{height:"30px",backgroundColor:"black",color:"white",fontFamily:" monospace",border:"none",cursor:"pointer"}}>Add to Cart</button> :<button onClick = {() => onCartClickHandler(props.productname)} style = {{height:"30px",backgroundColor:"black",color:"white",fontFamily:" monospace",border:"none",cursor:"pointer"}}>Add to Cart</button> }
        
        <p style = {{fontFamily:"monospace",marginBottom:"0"}}>{props.productname}</p>
        <p style = {{fontFamily:"monospace",marginBottom:"0"}}>{props.productprice}</p>
        {props.updatedproductQuantityRemaining[props.productId] === "0"? <p style = {{color:"red",fontFamily:"monospace",marginBottom:"0"}}> Out of Stock </p> :  <p style = {{fontFamily:"monospace"}}>Only 
        <span style = {{color: "red",marginBottom:"0"}}>{ " "+props.updatedproductQuantityRemaining[props.productId]} </span>left in Stock</p>}
        
      
       {/*  <div className = "size" style = {{display: "flex"}}>
            <div style = {{fontFamily:"monospace",border:"0.5px solid black",width:"20px",textAlign:"center",margin:"0 3px"}}>S</div>
            <div style = {{fontFamily:"monospace",border:"0.5px solid black",width:"20px",textAlign:"center",margin:"0 3px"}}>M</div>
            <div style = {{fontFamily:"monospace",border:"0.5px solid black",width:"20px",textAlign:"center",margin:"0 3px"}}>L</div>
            <div style = {{fontFamily:"monospace",border:"0.5px solid black",width:"20px",textAlign:"center",margin:"0 3px"}}>XL</div>
        </div> */}
       
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        updatedproductQuantityRemaining : state.productQuantityRemaining,
        
    }
}
export default connect(mapStateToProps)(Products);