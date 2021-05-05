import Products from './Products'; 

const DisplayedProducts = (props) => {
    console.log("product",props) 
    let products = [...props.products]
   
    if(props.products.length > 0){
        return(
            products.map((elements) => {
                return (
                        <div style = {{display:"flex",flexDirection:"row",flexWrap:"wrap",position:"absolute",top:"23%",width:"100%",margin:"0 auto",color:"black",justifyContent:"center"}}>
                            {elements.image.map((innerElements,index) => {
                                console.log("elements",elements)
                                        let productName = elements.product_name[index];
                                        let productPrice = elements.price[index];
                                        let productQuantityRemaining = elements.quantity[index];
                                        let productId  = elements.productId[index];
                                       
                                        return(
                                               <Products image = {innerElements} productname= {productName} productprice = {productPrice} productQuantityRemaining = {productQuantityRemaining} productId = {productId}></Products>
                                            )
                                            
                            })},
                            
                        </div>
                    )
                        })
            
    )}else{
        return null
    }

}
export default DisplayedProducts;