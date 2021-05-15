import {Fragment, useEffect, useState} from 'react';
// import Categories from "./Categories";
import ProductsDetails from '../ProductsDetails';
import DisplayedProducts from './DisplayedProducts';
const SearchProduct = () => {
    console.log('search products');
    const [isSelected,setIsSelected] = useState("default");
    const [filteredProducts, setfilteredProducts] = useState('');
    
    let temp = [...ProductsDetails];
    console.log(ProductsDetails[0])
    useEffect(() => 
    setfilteredProducts(temp.filter((products) => {
        
        return products.category === isSelected
        }))
    
    , [isSelected])
    
    
/*     const filterProducts = () => {
      
        setfilteredProducts(temp.filter((products) => {
                return products.category === isSelected
        }))
           
    }
   
    
    
    const categoryClickHandler = (categories) => {
        console.log('categoryclickHandler');
           /*  switch(categories){
                case('volume1'):
                    
                    setIsSelected('volume1') */
                    //filterProducts();
                   /*  break;

                case('tops'):
                
                setIsSelected('tops');
                filterProducts();
                break;

                case('bottom'):
                
                setIsSelected('bottom');
                filterProducts();
                break;

                default:
                    return null;
            } 
    }*/
     
    return(
        <Fragment>
         
            
            <DisplayedProducts products = {filteredProducts}/>
          
        </Fragment>
    )
}

export default SearchProduct;