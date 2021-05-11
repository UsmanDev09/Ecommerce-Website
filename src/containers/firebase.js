import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDmVoAfSSOBQg51nwFo2Zk5_u9ix-zpZWs",
    authDomain: "activa-3f2b5.firebaseapp.com",
    projectId: "activa-3f2b5",
    storageBucket: "activa-3f2b5.appspot.com",
    messagingSenderId: "429983319257",
    appId: "1:429983319257:web:775a432adc3e27901daac8",
    measurementId: "G-HK78C02Y2E"
  };


  const firebaseApp  = firebase.initializeApp(firebaseConfig)
  const auth = firebase.auth()
  const googleProvider = new firebase.auth.GoogleAuthProvider()


  export {googleProvider}
  export default auth