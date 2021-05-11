import { StaticRouter } from "react-router"

const reducer = (state , action) => {
    
    switch(action.type){
     
    case "addToCart":
        localStorage.setItem('quantity',+action.quantity + 1)
    return(  
            {
                ...state,
                quantity :  +action.quantity + 1,
                
              
            }

    )

    case "addProduct":
        
        
        localStorage.setItem('productName', state.productName.length === 0 ? [action.productName] :[state.productName,action.productName])
        localStorage.setItem('productQuantity', state.productQuantity.length === 0 ? [action.productQuantity] :[state.productQuantity,action.productQuantity])   
        localStorage.setItem('productImage', state.productImage.length === 0 ? [action.productImage] :[state.productImage,action.productImage])
        localStorage.setItem('productPrice', state.productPrice.length === 0 ? [action.productPrice] :[state.productPrice,action.productPrice])
        localStorage.setItem('productId',state.productId.length === 0 ?  [action.productId]: [state.productId,action.productId])    
        
        if(localStorage.getItem('productAvailable') === null){
            localStorage.setItem('productAvailable', ["top_one","bottom_two","bottom_three","top_four","top_five","bottom_four","top_seven","top_eight", "top_nine","top_ten","top_eleven","top_twelve","top_thirteen"] )
            localStorage.setItem('productQuantityRemaining', ["2","3","4","5","1","7","2","3","4","5","1","7","1"] )
            
        }
        if(localStorage.getItem('productName') ){
            let i =0;
            let ind;
            if(localStorage.getItem('productName').length > 1){
                localStorage.getItem('productName').split(',').forEach((element,index) => {
                    if(element === action.productName) 
                        i++    
            })
          
        }
            
            if(i > 0){
                
            ind = localStorage.getItem('productName').split(',').indexOf(action.productName);
                state.productName[ind] = localStorage.getItem('productName').split(',')[ind];
                state.productImage[ind] = localStorage.getItem('productImage').split(',')[ind];
                state.productPrice[ind] = localStorage.getItem('productPrice').split(',')[ind];
                localStorage.setItem('productName', [state.productName]);
                localStorage.setItem('productImage', [state.productImage]);
                localStorage.setItem('productPrice', [state.productPrice]);
                state.productQuantityRemaining[action.productId] = localStorage.getItem('productQuantityRemaining').split(',')[action.productId] -1;
                localStorage.setItem('productQuantityRemaining', [state.productQuantityRemaining]);
            }
            if(i > 1){
                state.productQuantity[ind] = +localStorage.getItem('productQuantity').split(',')[ind] + 1;
                localStorage.setItem('productQuantity', [state.productQuantity]);
            }
        } 
        
        localStorage.setItem('subTotal',+state.subTotal + (+action.productPrice.slice(1)))
       
        return(
            { 
                ...state,
                quantity: localStorage.getItem('quantity'),
                productName: state.productName.length === 0 ? [action.productName] : localStorage.getItem('productName').split(','),    
                productQuantity: state.productQuantity.length === 0 ? [action.productQuantity] : localStorage.getItem('productQuantity').split(','),
                productImage: state.productImage.length === 0 ? [action.productImage] : localStorage.getItem('productImage').split(','),
                productPrice: state.productPrice.length === 0 ? [action.productPrice] : localStorage.getItem('productPrice').split(','),            
                productQuantityRemaining : state.productQuantityRemaining.length === 0 ? [action.productQuantityRemaining-1] : localStorage.getItem('productQuantityRemaining').split(','),        
                productId: state.productId.length === 0? [action.productId]: localStorage.getItem('productId').split(','),
                subTotal : localStorage.getItem('subTotal')
            }
    )
    case "RemoveProduct":
       
        let inde = localStorage.getItem('productName').split(',').indexOf(action.productName)
        let ide =  localStorage.getItem('productAvailable').split(',').indexOf(action.productName)
        state.productName.splice(inde,1)
        localStorage.setItem('productName',  state.productName);
        state.productImage.splice(inde,1)
        localStorage.setItem('productImage', state.productImage);
        let priceReduced = state.productPrice.splice(inde,1).join("").slice(1)
        console.log("price",priceReduced)
        localStorage.setItem('productPrice', state.productPrice);
         let quantityReduced = state.productQuantity.splice(inde,1)
        localStorage.setItem('productQuantity', state.productQuantity);
        state.quantity = state.quantity - quantityReduced;
        localStorage.setItem('quantity',state.quantity)
        state.productQuantityRemaining[ide] = +state.productQuantityRemaining[ide] + +quantityReduced
        localStorage.setItem('productQuantityRemaining', state.productQuantityRemaining);
        state.subTotal = +state.subTotal  - +(priceReduced   * quantityReduced)
        localStorage.setItem('subTotal',state.subTotal)
        return(
                {
                    ...state,
                    productName: localStorage.getItem('productName').split(',')[0] === ""? []: localStorage.getItem('productName').split(','),    
                    productQuantity:  localStorage.getItem('productQuantity').split(',')[0] === ""? [] : localStorage.getItem('productQuantity').split(','),
                    productImage: localStorage.getItem('productImage').split(',')[0] === ""? [] : localStorage.getItem('productImage').split(','),
                    productPrice:  localStorage.getItem('productPrice').split(',')[0] === ""? [] : localStorage.getItem('productPrice').split(',') , 
                    quantity: localStorage.getItem('quantity'),
                    subTotal : localStorage.getItem('subTotal') ,
                    productQuantityRemaining :  localStorage.getItem('productQuantityRemaining').split(',')
                }
        )      


        case "IncreaseQuantity":
            let ind = localStorage.getItem('productName').split(',').indexOf(action.productName)
            let id =  localStorage.getItem('productAvailable').split(',').indexOf(action.productName)
           
           
            state.productQuantity[ind] = state.productQuantityRemaining[id] > 0? +state.productQuantity[ind] + 1 : state.productQuantity[ind]
            state.subTotal = state.productQuantityRemaining[id] > 0?  +state.subTotal + +state.productPrice[ind].slice(1) : state.subTotal
            state.quantity =  state.productQuantityRemaining[id] > 0? +state.quantity +1 : state.quantity
            state.productQuantityRemaining[id] =  state.productQuantityRemaining[id] > 0? +state.productQuantityRemaining[id] - 1 : state.productQuantityRemaining[id]
           
            localStorage.setItem('productQuantity', state.productQuantity)
            localStorage.setItem('productQuantityRemaining',state.productQuantityRemaining)
            console.log("compare",state.productQuantityRemaining[id],"id",id)
            localStorage.setItem('subTotal',state.subTotal)
            localStorage.setItem('quantity',state.quantity)
            return( {
                ...state,
                productQuantity : localStorage.getItem('productQuantity').split(','),
                productQuantityRemaining : localStorage.getItem('productQuantityRemaining').split(','),
                subTotal: localStorage.getItem('subTotal'),
                quantity: localStorage.getItem('quantity')
            }
            )      

            case "DecreaseQuantity":
             
                let indd = localStorage.getItem('productName').split(',').indexOf(action.productName)
                let idd  = localStorage.getItem('productAvailable').split(',').indexOf(action.productName)
                state.productQuantityRemaining[idd] = state.productQuantity[indd] > 1? +state.productQuantityRemaining[idd] + 1: state.productQuantityRemaining[idd]
                state.subTotal = state.productQuantity[indd] > 0? +state.subTotal - +state.productPrice[indd].slice(1) : state.subTotal 
                state.quantity =   state.productQuantity[indd] > 0? +state.quantity - 1: state.quantity;
                state.productQuantity[indd] = state.productQuantity[indd] > 1? +state.productQuantity[indd] - 1 : state.productQuantity[indd] 
               
               
                localStorage.setItem('productQuantity', state.productQuantity)
                localStorage.setItem('subTotal',state.subTotal)
                localStorage.setItem('productQuantityRemaining',state.productQuantityRemaining)
                localStorage.setItem('quantity', state.quantity)
                return( {
                    ...state,
                    productQuantity : localStorage.getItem('productQuantity').split(','),
                    productQuantityRemaining : localStorage.getItem('productQuantityRemaining').split(','),
                    subTotal: localStorage.getItem('subTotal'),
                    quantity: localStorage.getItem('quantity')
                }
                )      
    case "CountrySelected":
        localStorage.setItem('countrySelected',action.selectedCountry)
    return(
            {
                ...state,
                selectedCountry: localStorage.getItem('countrySelected')
            }
    )

    case "RegionSelected":
        localStorage.setItem('regionSelected',action.selectedRegion)
    return(
            {
                ...state,
                selectedRegion: action.selectedRegion
            }
    )

    case "CustomerFirstName":
       
        localStorage.setItem('CustomerFirstName',action.customerFirstName)
      
    return(
            {   
                ...state,
                customerFirstName :  localStorage.getItem('CustomerFirstName')
            }
        
    )

    case "CustomerLastName":
       
        localStorage.setItem('CustomerLastName',action.customerLastName)
      
    return(
            {   
                ...state,
                customerLastName :  localStorage.getItem('CustomerLastName')
            }
        
    )

    case "CustomerEmail":
       
        localStorage.setItem('CustomerEmail',action.customerEmail)
      
    return(
            {   
                ...state,
                customerEmail : localStorage.getItem('CustomerEmail')
            }
        
    )

    case "EmailError":
        let boolean = false;
        localStorage.setItem("EmailError",action.EmailError)    
            if(localStorage.getItem('LastNameError') === ""  && localStorage.getItem('FirstNameError') === "" && localStorage.getItem('EmailError') === "" && localStorage.getItem('PhoneNumberError') === ""  && localStorage.getItem('countrySelected') !== "" )
            {
                boolean = "true";
             }    
       
     
      
    return(
            {   
                ...state,
                EmailError :  localStorage.getItem("EmailError"),
                verified: boolean
            }
        
    )
    case "PhoneNumber":
        localStorage.setItem('phoneNumber',action.phoneNumber)
     
      
        return(
                {   
                    ...state,
                   phoneNumber: localStorage.getItem('phoneNumber')
                }
            
        )
        case "PhoneNumberError":
            let boolean1  =false
            localStorage.setItem('PhoneNumberError',action.phoneErrorMessage)
            if(localStorage.getItem('LastNameError') === ""  && localStorage.getItem('FirstNameError') === "" && localStorage.getItem('EmailError') === "" && localStorage.getItem('PhoneNumberError') === ""  && localStorage.getItem('countrySelected') !== "" )
            {
                boolean1 = "true";
             }    
               
      
            return(
                    {   
                        ...state,
                        phoneErrorMessage :  localStorage.getItem('PhoneNumberError'),
                        verified:boolean1
                    }
                
            )
         
        case "FirstNameError":
            let boolean2 = false;
            localStorage.setItem('FirstNameError',action.firstNameError)
            if(localStorage.getItem('LastNameError') === ""  && localStorage.getItem('FirstNameError') === "" && localStorage.getItem('EmailError') === "" && localStorage.getItem('PhoneNumberError') === ""  && localStorage.getItem('countrySelected') !== "" )
            {
                boolean2 = "true";
             }    
                   
     
      
                return(
                        {   
                            ...state,
                            firstNameError :  localStorage.getItem('FirstNameError'),
                           verified: boolean2
                          
                        }
                    
                )
        case "LastNameError":
            let boolean3 = false;
            localStorage.setItem('LastNameError',action.lastNameError)
            if(localStorage.getItem('LastNameError') === ""  && localStorage.getItem('FirstNameError') === "" && localStorage.getItem('EmailError') === "" && localStorage.getItem('PhoneNumberError') === ""  && localStorage.getItem('countrySelected') !== "" )
            {
                boolean3 = "true";
             }        
            
            return(
                        
                            {   
                                ...state,
                               
                                lastNameError : localStorage.getItem("LastNameError"),
                                verified : boolean3
                              
                            }
                        
                     )
                     case "VerifyAddress":

                        return(
                                {   
                                    ...state,
                                    addressError : action.addressError
                                  
                                }
                            
                        )
        case "FormSubmission":
                        return(
                                {   
                                    ...state,
                                    verified : action.verified,
                                    formSubmissionError : action.formSubmissionError,
                                    countryError : action.countryError
                                  
                                }
                            
                        )
        case "Toggle":
       
     
      
            return(
                    {   
                        ...state, 
                        toggle: action.toggle,
                      
                    }
                
            )
            case "ClickCart":
       
     
      
            return(
                    {   
                        ...state,
                        toggleCart: action.toggleCart,
                      
                    }
                
            )

            case "Address":
                localStorage.setItem('Address',action.phoneNumber)
            return(
                {   
                    ...state,
                    Address: action.Address,
                  
                }
            
        )

        case "login" :
            localStorage.setItem('userEmail', action.userEmail);
            localStorage.setItem('userName', action.userName)
            return(
                {
                    ...state,
                    userEmail : localStorage.getItem('userEmail'),
                    userName : localStorage.getItem('userName')
                    
            }
            )
        

            case "logout" :
                localStorage.setItem('userEmail', "")
                localStorage.setItem('userName',"")
                return(
                    {
                        ...state,
                        userName : null,
                        userEmail : null
                    }
                )
    default:

        return state;
}
}

export default reducer;