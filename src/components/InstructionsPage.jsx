export const Instructions=({setSettings,setStart,setKeys})=>{
    return(
        <section>
          <h1 className="title" style={{ fontSize: "40px" }}>
            SABOTAGE
          </h1>
          <p className="zx">BASED ON AN ORIGINAL ZX81 GAME BY DON PREISTLEY</p>
          <p className="zx">PLAY THE ORIGINAL <a href="https://www.zx81stuff.org.uk/zx81/jtyone.html?track=Sabotage.tzx.zip@0&title=Sabotage&scale=2&speed=4" target="_blank">HERE</a>(KEYS - W,S,H,J AND E)</p>
          <p className="zx">
            THE OBJECT IS TO CREATE AS MUCH HAVOC WITHIN THE MUNITIONS YARD AS
            POSSIBLE
          </p>
          <p className="zx">
            YOU HAVE UNLIMITED EXPLOSIVE CHARGES, BUT THE YARD IS PATROLLED BY
            GUARDS
          </p>
          <p className="zx">TRY NOT TO GET CAUGHT!</p>
     
          <p className="zx" >KEYS ARE: Z-LEFT, X-RIGHT, K-UP, M-DOWN AND L-PLACE CHARGE</p>
          <button className="zx" onClick={()=>setKeys(true)}>REDEFINE KEYS</button>
          <br/>
      
        
          <br />
          <section className="settingsButtons">
            <button className="zx" onClick={() => setSettings(true)}>
              SETTINGS
            </button>
            <button className="zx" onClick={() => setStart(true)}>
              START GAME
            </button>
          </section>
        </section>
    )
}