import {connect} from 'react-redux';

const OrderCompleted = (props) => {
    return(

        <div style = {{position:"absolute",top:"20%",width:"100vw",height:"100%"}}>
           <div style = {{position:"absolute",left:"5%",width:"30%", fontFamily:"monospace"}}> 
            <h2>Shipping Details:</h2>
            
            <div className = "customerData">
            <p>{props.customerFirstName}</p>
            <p>{props.customerLastName}</p>
            <p>{props.phoneNumber}</p>
            <p>{props.customerEmail}</p>
        </div>
        <div >
            <h2>Order details:</h2>
            {props.productName.map((element,index) => {
             
                let productqua = props.productQuantity[index]
                return (
                <div>
                <p>{element}</p>
                <p>{productqua}</p>
                <p>Delivery Type: Cash on Delivery</p>
                </div>
                )
            })}
            </div>
            <h1>Total: ${props.subTotal} </h1>
          
            </div>

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
    customerFirstName: state.customerFirstName,
    customerLastName: state.customerLastName,
    customerEmail : state.customerEmail,
    phoneNumber : state.phoneNumber,
    productName: state.productName,
    productQuantity : state.productQuantity,
    subTotal : state.subTotal
    }
}

export default connect(mapStateToProps)(OrderCompleted);