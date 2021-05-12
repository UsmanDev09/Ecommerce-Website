import {createStore} from 'redux';
import reducer from './reducer';

const store = createStore(reducer,
    {
        quantity:localStorage.getItem('quantity')? localStorage.getItem('quantity'): null,
        productName: (localStorage.getItem('productName') === null) || localStorage.getItem('productName').length === 0? [] : localStorage.getItem('productName').split(','),
        productQuantity :  localStorage.getItem('productQuantity') === null || localStorage.getItem('productQuantity').length === 0? [] : localStorage.getItem('productQuantity').split(','),
        productAvailable: localStorage.getItem('productAvailable') === null? ["top_one","top_two","top_three","top_four","top_five","top_six","top_seven","top_eight", "top_nine","top_ten","top_eleven","top_twelve","top_thirteen","bottom_one","bottom_two","bottom_three","bottom_four","bottom_five"] : localStorage.getItem('productAvailable').split(','),
        productQuantityRemaining :  localStorage.getItem('productQuantityRemaining') === null? ["2","3","4","5","1","7","2","3","4","5","1","7","1","2","3","4","5","1","7"] : localStorage.getItem('productQuantityRemaining').split(','),
        productImage: localStorage.getItem('productImage') === null || localStorage.getItem('productImage').length === 0? [] : localStorage.getItem('productImage').split(','),
        productPrice: localStorage.getItem('productPrice') === null || localStorage.getItem('productPrice').length === 0? [] : localStorage.getItem('productPrice').split(','),
        customerFirstName: localStorage.getItem('CustomerFirstName') === null? '' :localStorage.getItem('CustomerFirstName') ,
        customerLastName: localStorage.getItem('CustomerLastName') === null? '' :localStorage.getItem('CustomerLastName'),
        customerEmail: localStorage.getItem('CustomerEmail') === null? '' :localStorage.getItem('CustomerEmail'),
        phoneNumber: localStorage.getItem('phoneNumber') === null? '' :localStorage.getItem('phoneNumber'),
        productId : localStorage.getItem('productId') === null? '' :localStorage.getItem('productId'),
        subTotal : localStorage.getItem('subTotal')? localStorage.getItem('subTotal') : 0,
        Address: localStorage.getItem('Address') === null? '' :localStorage.getItem('Address'),
        toggle:false,
        toggleCart : false,
        verified: false,
        selectedCountry : "",
        selectedRegion : "",
        phoneErrorMessage: localStorage.getItem('PhoneNumberError'),
        firstNameError: localStorage.getItem('FirstNameError'),
        lastNameError: localStorage.getItem('LastNameError'),
        EmailError: localStorage.getItem('EmailError'),
        userEmail : localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') : null ,
        userName :  localStorage.getItem('userName') ? localStorage.getItem('userName') : null ,
        userMobileNumber : localStorage.getItem('userMobileNumber') ? localStorage.getItem('userMobileNumber') : null 
    },
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
