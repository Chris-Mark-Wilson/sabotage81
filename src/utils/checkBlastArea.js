 const checkBlastArea=(pos,myPos,guardPos)=>{
     const findArray=[{x:pos.x-1,y:pos.y-1},{x:pos.x-1,y:pos.y},{x:pos.x+1,y:pos.y-1},{x:pos.x-1,y:pos.y},{x:pos.x+1,y:pos.y},{x:pos.x-1,y:pos.y+1},{x:pos.x,y:pos.y+1},{x:pos.x+1,y:pos.y+1}]
     
if (findArray.some(pos=>myPos.x===pos.x&&myPos.y===pos.y)) return "player"
if(findArray.some(pos=>guardPos.x===pos.x&&guardPos.y===pos.y)) return "guard"

}
export default checkBlastArea
