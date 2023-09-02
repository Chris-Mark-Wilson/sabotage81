export const Box=({box})=>{
    return(
              <div
                className="tnt"
                style={{ gridColumn: box.x, gridRow: box.y }}
            >
                tnt
              </div>
    )
}