const Guard=({guardX,guardY,setGardX,setGuardY,guardText})=>{

    return (
        <div id="guard"  style={{gridColumn:guardX,gridRow:guardY}}>{guardText}</div>
    )
}
export default Guard