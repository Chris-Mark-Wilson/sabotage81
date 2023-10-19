export const createHiScoreArray=(scoresObject)=>{
const keys=Object.keys(scoresObject)
const scoresArray=[]
keys.forEach((key,index)=>{
    scoresArray.push({
        id:index,
        name:key,
        score:scoresObject[key]
    })
})
const sortedScores=scoresArray.sort((a,b)=>b.score-a.score)
return sortedScores;
}