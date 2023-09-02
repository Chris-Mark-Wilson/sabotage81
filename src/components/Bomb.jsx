export const Bomb=({bombPos,bombText})=>{
    return (
        <div
        className="bomb"
        id="bomb"
        style={{
          gridColumn: bombPos.x,
          gridRow: bombPos.y,
          visibility: false,
          backgroundColor: bombText.colour,
        }}
      >
        {bombText.text}
      </div>    )
}