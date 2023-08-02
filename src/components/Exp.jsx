const Exp=({x,y,text,index})=>{
    return(
  <div className="tnt" key={index} style={{gridColumn:x,gridRow:y}}>{text}</div>
    )
  }
  export default Exp