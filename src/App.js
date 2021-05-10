
import './App.css';
import {useEffect} from 'react'
import Main from './containers/Main'
import auth from './containers/firebase';
import store from './redux/store'
function App() {

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        console.log('email',userAuth)
        store.dispatch({
          type :"login",
          userName : userAuth.displayName,
          userEmail : userAuth.email
          
      })
      }else{
        store.dispatch({
          type : "logout",
          user : null
        })
      }
    })


    return unsubscribed
    
  },[])
  return (
    <Main></Main>
  );  
}

export default App;
