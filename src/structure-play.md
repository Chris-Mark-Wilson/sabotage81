trigger fire function
get list of boxes (explosions)
on change -
   useEffect(()+>{
        const position=explosions[0]
        setFireBallPos({x:position.x-1,y:position.y-1})
        setFireBallClass("bang") - visible
        setTimeout(()=>{
    setFireBallClass("null") - invisible or ""
    const remaining=explosions.filter(exp=>exp.x!=position.x&&exp.y!=position.y)
    setExplosions[...remaining]
        },250)


    },[explosions])