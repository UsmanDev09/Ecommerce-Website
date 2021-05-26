import {database} from '../containers/firebase'
import auth from '../containers/firebase'

const reducer = (state , action) => {
    
    switch(action.type){
     case "data_Initialised":
       console.log("here",action.initialState)
       return {
         ...action.initialState,
         
       }
    case "addToCart":
        localStorage.setItem('quantity',+action.quantity + 1)
       
        database.ref().set({
            ...state,
            quantity: +action.quantity + 1,
        }
        ,(error) => {
            if (error) {
              console.log("The write failed...")
            } else {
              console.log("Data saved successfully!")
            }
          })

       

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
        
        database.ref().set({
            ...state,
            productName : state.productName.length === 0 ? [action.productName] :[state.productName,action.productName],
            productQuantity : state.productQuantity.length === 0 ? [action.productQuantity] :[state.productQuantity,action.productQuantity],
            productImage:state.productImage.length === 0 ? [action.productImage] :[state.productImage,action.productImage],
            productPrice: state.productPrice.length === 0 ? [action.productPrice] :[state.productPrice,action.productPrice]  
        }
        ,(error) => {
            if (error) {
              console.log("The write failed...")
            } else {
              console.log("Data saved successfully!")
            }
          })
         // database.ref().get().then(
           // (snapshot) => {
             
         // if(snapshot.val().productAvailable === null){
         if(localStorage.getItem('productAvailable') === null){
            localStorage.setItem('productAvailable', ["top_one","bottom_two","bottom_three","top_four","top_five","bottom_four","top_seven","top_eight", "top_nine","top_ten","top_eleven","top_twelve","top_thirteen"] )
            localStorage.setItem('productQuantityRemaining', ["2","3","4","5","1","7","2","3","4","5","1","7","1"] )
            database.ref().set({
                ...state,
                productAvailable : ["top_one","bottom_two","bottom_three","top_four","top_five","bottom_four","top_seven","top_eight", "top_nine","top_ten","top_eleven","top_twelve","top_thirteen"],
                productQuantityRemaining :  ["2","3","4","5","1","7","2","3","4","5","1","7","1"] 
            }
            ,(error) => {
                if (error) {
                  console.log("The write failed...")
                } else {
                  console.log("Data saved successfully!")
                }
              })
            }
       // }
        //)

        database.ref().get().then(
            (snapshot) => {
             
       // if(snapshot.val().productAvailable ){
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
                database.ref().set({
                    ...state,
                   productName : [state.productName],
                   productImage : [state.productImage],
                   productPrice : [state.productPrice]
                }
                ,(error) => {
                    if (error) {
                      console.log("The write failed...")
                    } else {
                      console.log("Data saved successfully!")
                    }
                  })
                state.productQuantityRemaining[action.productId] = localStorage.getItem('productQuantityRemaining').split(',')[action.productId] -1;
                localStorage.setItem('productQuantityRemaining', [state.productQuantityRemaining]);
                database.ref().set({
                    ...state,
                    productQuantityRemaining :   [state.productQuantityRemaining]
                }
                ,(error) => {
                    if (error) {
                      console.log("The write failed...")
                    } else {
                      console.log("Data saved successfully!")
                    }
                  })
                }
            if(i > 1){
                state.productQuantity[ind] = +localStorage.getItem('productQuantity').split(',')[ind] + 1;
                localStorage.setItem('productQuantity', [state.productQuantity]);
                database.ref().set({
                    ...state,
                    productQuantity :   [state.productQuantity]
                }
                ,(error) => {
                    if (error) {
                      console.log("The write failed...")
                    } else {
                      console.log("Data saved successfully!")
                    }
                  })
                }

            }
            })
        
        localStorage.setItem('subTotal',+state.subTotal + (+action.productPrice.slice(1)))
        database.ref().set({
            ...state,
            subTotal :   [state.subTotal]
        }
        ,(error) => {
            if (error) {
              console.log("The write failed...")
            } else {
              console.log("Data saved successfully!")
            }
          })
        
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
       // database.ref().get().then(
        //    (snapshot) => {
             
        //let productNameIndex =  snapshot.val().productName.split(',').indexOf(action.productName)
        //let ide = snapshot.val().productAvailable.split(',').indexOf(action.productName)
        
         let productNameIndex = localStorage.getItem('productName').split(',').indexOf(action.productName)
         let ide =  localStorage.getItem('productAvailable').split(',').indexOf(action.productName)
        state.productName.splice(productNameIndex,1)
        localStorage.setItem('productName',  state.productName);
        state.productImage.splice(productNameIndex,1)
        localStorage.setItem('productImage', state.productImage);
        let priceReduced = state.productPrice.splice(productNameIndex,1).join("").slice(1)
       
        localStorage.setItem('productPrice', state.productPrice);
         let quantityReduced = state.productQuantity.splice(productNameIndex,1)
        localStorage.setItem('productQuantity', state.productQuantity);
        state.quantity = state.quantity - quantityReduced;
        localStorage.setItem('quantity',state.quantity)
        state.productQuantityRemaining[ide] = +state.productQuantityRemaining[ide] + +quantityReduced
        localStorage.setItem('productQuantityRemaining', state.productQuantityRemaining);
        state.subTotal = +state.subTotal  - +(priceReduced   * quantityReduced)
        localStorage.setItem('subTotal',state.subTotal)
        //})
        database.ref().set({
            ...state,
            productName: state.productName,
            productImage: state.productImage,
            productPrice: state.productPrice,
            productQuantity: state.productQuantity,
            quantity: state.quantity,
            productQuantityRemaining : state.productQuantityRemaining,
            subTotal: state.subTotal

        }
           
        , (error) => {
            if (error) {
              console.log("The write failed...")
            } else {
              console.log("Data saved successfully!")
            }
          })
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
            //database.ref().get().then(
            //(snapshot) => {
                 
              //  let ind =  snapshot.val().productName.split(',').indexOf(action.productName)
              //  let id = snapshot.val().productAvailable.split(',').indexOf(action.productName)
            
                state.productQuantity[ind] = state.productQuantityRemaining[id] > 0? +state.productQuantity[ind] + 1 : state.productQuantity[ind]
                state.subTotal = state.productQuantityRemaining[id] > 0?  +state.subTotal + +state.productPrice[ind].slice(1) : state.subTotal
                state.quantity =  state.productQuantityRemaining[id] > 0? +state.quantity +1 : state.quantity
                state.productQuantityRemaining[id] =  state.productQuantityRemaining[id] > 0? +state.productQuantityRemaining[id] - 1 : state.productQuantityRemaining[id]
            
            //})
            localStorage.setItem('productQuantity', state.productQuantity)
            localStorage.setItem('productQuantityRemaining',state.productQuantityRemaining)
            localStorage.setItem('subTotal',state.subTotal)
            localStorage.setItem('quantity',state.quantity)
            

            database.ref().set({
                ...state,
                productQuantity: state.productQuantity,
                productQuantityRemaining : state.productQuantityRemaining,
                subTotal : state.subTotal,
                quantity : state.quantity
    
            }
               
            , (error) => {
                if (error) {
                  console.log("The write failed...")
                } else {
                  console.log("Data saved successfully!")
                }
              })
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
                //database.ref().get().then(
                //(snapshot) => {
                     
                  //  let indd =  snapshot.val().productName.split(',').indexOf(action.productName)
                    //let idd = snapshot.val().productAvailable.split(',').indexOf(action.productName)
                    state.productQuantityRemaining[idd] = state.productQuantity[indd] > 1? +state.productQuantityRemaining[idd] + 1: state.productQuantityRemaining[idd]
                    state.subTotal = state.productQuantity[indd] > 0? +state.subTotal - +state.productPrice[indd].slice(1) : state.subTotal 
                    state.quantity =   state.productQuantity[indd] > 0? +state.quantity - 1: state.quantity;
                    state.productQuantity[indd] = state.productQuantity[indd] > 1? +state.productQuantity[indd] - 1 : state.productQuantity[indd] 
                //})
               
                localStorage.setItem('productQuantity', state.productQuantity)
                localStorage.setItem('subTotal',state.subTotal)
                localStorage.setItem('productQuantityRemaining',state.productQuantityRemaining)
                localStorage.setItem('quantity', state.quantity)

                database.ref().set({
                    ...state,
                    productQuantity: state.productQuantity,
                    productQuantityRemaining : state.productQuantityRemaining,
                    subTotal : state.subTotal,
                    quantity : state.quantity
        
                }
                   
                , (error) => {
                    if (error) {
                      console.log("The write failed...")
                    } else {
                      console.log("Data saved successfully!")
                    }
                  })

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
        database.ref().set({
            ...state,
            countrySelected : action.selectedCountry

        }
           
        , (error) => {
            if (error) {
              console.log("The write failed...")
            } else {
              console.log("Data saved successfully!")
            }
          })
    return(
            {
                ...state,
                selectedCountry: localStorage.getItem('countrySelected')
            }
    )

    case "RegionSelected":
        localStorage.setItem('regionSelected',action.selectedRegion)

        database.ref().set({
            ...state,
            regionSelected : action.selectedRegion
        }
        , (error) => {
            if (error) {
              console.log("The write failed...")
            } else {
              console.log("Data saved successfully!")
            }
          })

    return(
            {
                ...state,
                selectedRegion: action.selectedRegion
            }
    )

    case "CustomerFirstName":
       
        localStorage.setItem('CustomerFirstName',action.customerFirstName)
      
        database.ref().set({
            ...state,
            customerFirstName : action.customerFirstName

        }
           
        , (error) => {
            if (error) {
              console.log("The write failed...")
            } else {
              console.log("Data saved successfully!")
            }
          })

    return(
            {   
                ...state,
                customerFirstName :  localStorage.getItem('CustomerFirstName')
            }
        
    )

    case "CustomerLastName":
       
        localStorage.setItem('CustomerLastName',action.customerLastName)
            
        database.ref().set({
            ...state,
            customerLastName : action.customerLastName

        }
           
        , (error) => {
            if (error) {
              console.log("The write failed...")
            } else {
              console.log("Data saved successfully!")
            }
          })
    return(
            {   
                ...state,
                customerLastName :  localStorage.getItem('CustomerLastName')
            }
        
    )

    case "CustomerEmail":
       
        localStorage.setItem('CustomerEmail',action.customerEmail)
        database.ref().set({
            ...state,
            customerEmail : action.customerEmail

        }
           
        , (error) => {
            if (error) {
              console.log("The write failed...")
            } else {
              console.log("Data saved successfully!")
            }
          })
    return(
            {   
                ...state,
                customerEmail : localStorage.getItem('CustomerEmail')
            }
        
    )

    case "EmailError":
        let boolean = false;
        localStorage.setItem("EmailError",action.EmailError)    

        database.ref().set({
            ...state,
            EmailError : action.EmailError

        }
           
        , (error) => {
            if (error) {
              console.log("The write failed...")
            } else {
              console.log("Data saved successfully!")
            }
          })
          database.ref().get().then(
            (snapshot) => {
             
            //if(snapshot.val().lastNameError === "" && snapshot.val().firstNameError === "" && snapshot.val().EmailError === "" && snapshot.val().phoneErrorMessage === "" && snapshot.val().countrySelected !== "") 
             if(localStorage.getItem('LastNameError') === ""  && localStorage.getItem('FirstNameError') === "" && localStorage.getItem('EmailError') === "" && localStorage.getItem('PhoneNumberError') === ""  && localStorage.getItem('countrySelected') !== "" )
            {
                boolean = "true";
             }    
            })
     
      
    return(
            {   
                ...state,
                EmailError :  localStorage.getItem("EmailError"),
                verified: boolean
            }
        
    )
    case "PhoneNumber":
        localStorage.setItem('phoneNumber',action.phoneNumber)
        database.ref().set({
            ...state,
            phoneNumber : action.phoneNumber

        }
           
        , (error) => {
            if (error) {
              console.log("The write failed...")
            } else {
              console.log("Data saved successfully!")
            }
          })
      
        return(
                {   
                    ...state,
                   phoneNumber: localStorage.getItem('phoneNumber')
                }
            
        )
        case "PhoneNumberError":
            let boolean1  =false
            localStorage.setItem('PhoneNumberError',action.phoneErrorMessage)
            database.ref().set({
                ...state,
                phoneErrorMessage : action.phoneErrorMessage
    
            }
               
            , (error) => {
                if (error) {
                  console.log("The write failed...")
                } else {
                  console.log("Data saved successfully!")
                }
              })
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
            database.ref().set({
                ...state,
                firstNameError : action.firstNameError
    
            }
               
            , (error) => {
                if (error) {
                  console.log("The write failed...")
                } else {
                  console.log("Data saved successfully!")
                }
              })
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
            database.ref().set({
                ...state,
                lastNameError : action.lastNameError
    
            }
               
            , (error) => {
                if (error) {
                  console.log("The write failed...")
                } else {
                  console.log("Data saved successfully!")
                }
              })
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
                localStorage.setItem('Address',action.Address)
                database.ref().set({
                    ...state,
                    Address : action.Address
        
                }
                   
                , (error) => {
                    if (error) {
                      console.log("The write failed...")
                    } else {
                      console.log("Data saved successfully!")
                    }
                  })
            return(
                {   
                    ...state,
                    Address: action.Address,
                  
                }
            
        )

        case "login" :
            localStorage.setItem('userEmail', action.userEmail);
            localStorage.setItem('userName', action.userName)
            
            database.ref().set({
                ...state,
                userEmail : action.userEmail,
                userName : action.userName
            }
               
            , (error) => {
                if (error) {
                  console.log("The write failed...")
                } else {
                  console.log("Data saved successfully!")
                }
              })
            return(
                {
                    ...state,
                    userEmail : localStorage.getItem('userEmail'),
                    userName : localStorage.getItem('userName'),
               
                    
            }
            )
        

            case "logout" :
                localStorage.setItem('userEmail', "")
                localStorage.setItem('userName',"")
                database.ref().set({
                    ...state,
                    userEmail : "",
                    userName : ""
        
                }
                   
                , (error) => {
                    if (error) {
                      console.log("The write failed...")
                    } else {
                      console.log("Data saved successfully!")
                    }
                  })
                return(
                    {
                        ...state,
                        userName : null,
                        userEmail : null
                    }
            )
            case "PreviousLocation" :
                localStorage.setItem("previousLocation",action.previousLocation)
                database.ref().set({
                    ...state,
                    previousLocation : action.previousLocation
        
                }
                   
                , (error) => {
                    if (error) {
                      console.log("The write failed...")
                    } else {
                      console.log("Data saved successfully!")
                    }
                  })
                return(
                    {
                        ...state,
                        previousLocation : localStorage.getItem("previousLocation")
                    }
            )
    default:

        return state;
}
}

export default reducer;