export const Box=({box})=>{
    return(
              <div
                className="tnt"
                key={box.id}
                style={{ gridColumn: box.x, gridRow: box.y }}
              >
                tnt
              </div>
    )
}