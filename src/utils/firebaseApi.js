
import {database} from '../firebaseConfig.js'
import { get,ref, set } from 'firebase/database';


const jsonRef=ref(database,)

 export const uploadHighScores=(scoresObject)=>{

    const scoresJson=JSON.stringify(scoresObject)

    set(jsonRef, scoresJson)
  .then(() => {
    console.log('JSON string uploaded successfully');
  })
  .catch((error) => {
    console.error('Error uploading JSON string:', error);
  });
    
}

export const getHighScores=()=>{
   return get(jsonRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const jsonScores = snapshot.val();
     
        return JSON.parse(jsonScores)
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error('Error retrieving JSON string:', error);
    });
}

