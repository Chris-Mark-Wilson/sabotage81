
import {database} from '../firebaseConfig.js'
import { get,ref, set } from 'firebase/database';


const jsonRef=ref(database,)

 export const uploadHighScores=(scoresObject)=>{

    const scoresJson=JSON.stringify(scoresObject)
return set(jsonRef, scoresJson)
 
  .catch((error) => {
    console.error('Error uploading JSON string:', error);
    return Promise.reject(error)
  });
    
}

export const getHighScores = () => {

   return get(jsonRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const jsonScores = snapshot.val();
     
        return JSON.parse(jsonScores)
      } else {
        
        return {} // return empty scores object if none available
      }
    })
    .catch((error) => {
      console.error('Error retrieving JSON string:', error);
      return Promise.reject(error)
    });
}


