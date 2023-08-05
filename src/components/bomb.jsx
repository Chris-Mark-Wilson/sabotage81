const Bomb=({bombX,bombY,bombText})=>{

    return (
        <div id="bomb" style={{gridColumn:bombX,gridRow:bombY }}>{bombText}</div>
    )
}
export default Bomb