import {initializeApp} from 'firebase/app'




import { getDatabase } from 'firebase/database';


  const firebaseConfig = {
    apiKey: import.meta.env.REACT_APP_API_KEY,
    authDomain: "cmwilsonsite.firebaseapp.com",
    databaseURL: "https://cmwilsonsite-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cmwilsonsite",
    storageBucket: "cmwilsonsite.appspot.com",
    messagingSenderId: "513620282298",
    appId: "1:513620282298:web:833a607754a8fe86cd6b83",
    measurementId: "G-8NWWKWZ56M"
  };

const app=initializeApp(firebaseConfig);

 const database=getDatabase(app)
 export {database};