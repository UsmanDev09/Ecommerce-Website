import firebase from 'firebase';
import {database} from './containers/firebase'


const ProductsDetails = [
    {
        product_name: [],
        image: [],
        price: [],
        quantity: [],
        productId: [],
        category: "default"
    }
]

database.collection('Products').get().then((snapshot) => {
    snapshot.docs.forEach((product) => {
        console.log("name", product.data().product_id, ProductsDetails[0].productId)
        ProductsDetails[0].product_name.push( product.data().product_name) 
        ProductsDetails[0].image.push( product.data().product_image)
        ProductsDetails[0].price.push( product.data().product_price)
        ProductsDetails[0].quantity.push( product.data().product_quantity)
        ProductsDetails[0].productId.push( product.data().product_id)
           
        console.log("Product Details", ProductsDetails)
    })
})





export default ProductsDetails;