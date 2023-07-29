# React + Vite

work to date..

uxb boxes grid co-ordinates held in state in an array - "boxes"
position of boxes determined randomly on 1st render via a useState function. max 300 boxes to start. Function checks to see if it is trying to place a box over an existing box, if so it increases the maxboxes by 1 to ensure 300 boxes get placed on the screen.
This may be the cause of a glitch that appears when in certain areas of the screen, there may well be 2 "divs" at that same co-ordinate..
Its not a 'bug'.. its a feature :) 

collision detection by comparing grid co-ordinates of required move to array, if co-ordinates exist in array, no move is possible as this means the grid square you are attempting to move into contains a uxb box..

keys to move are q-up, a-down, o-left, p-right
more zxSpectrum than zx81 but I prefer the chuckie egg layout ;)

trying to create a new div on the fly to serve as the 'bomb', isnt working at the minute... next job... fix it...
solution (dreampt up while trying to sleep) - carry the bomb with you, you always had it anyway, isnt that the point of the game? then just set a setTimeout(countdown,1000) to tick the bomb and when it reaches zero... BOOOOOM :) 
And the good thing about that, is that you can RUN AWAY because the event loop is looking after the ticking so its NON BLOCKING CODE!!
same thing to move the guard!!!
so.. onwards..
cool, now Ive got  bomb.. I rendered the bomb before "me" so that you see me and not the bomb when Im running around the screen, carrying it with me!
maybe I'll code in a machine gun later just so I can say "now I too have a machine gun"...

countdown set and working (press space to 'set' the bomb)

now for the tricky bit, gonna have to pseudocode this one...
We need a recursive function (do we?) yes probably - weve gotta set the bomb off.. and the idea is that a chain reaction occurs that sets off the neighbouring uxb's which in turn set off neighbouring uxb's and so on..
now, last time I had a go at this (many years ago) when I got to this bit I found that the chain reaction pretty much wiped out the entire screen...
These days Ive got the benefit of being able to acually PLAY the original version in an emulator.. and I noticed something...
You cannot score more than 50 boxes at a time...
So, the original dev must have had the same problem and 'capped' it off at 50 to solve it..
Right then...

//  boomTime - we gonna need an array... are we? not sure actually..
look around bomb, add the locations of each uxb within a 1 grid radius to an ARRAY (see, we need an array)

call function with an array containing bomb position - bangArray

    set STOP=false - instate, top of file
    
     if !STOP{
                
                look around the position
                add the positions of the to the testArray

                loop through the testArray
                        if the element at that position is a uxb, add to bangArray
                        delete THIS position from the uxb array (important!) - removeBox()
                        add 1 to score
                        
                if array.length>50 put a STOP flag up
                remove 1st element from bang array
                loop back around

                ok that now works..
    
    sort of..
    problem... bomb co-ordinates refuse to be reset to my position..
    and I also need to generate an 'explosion' graphic at the site of the explosions.. but I dont know how to get the element by the grid co-ordinates..
    looking into the following..
    let e=document.getElementBYId("tnt")
    let x=e.style.gridColumn
    let y=e.style.gridRow
    which gets the grid co-ordinates of an element

    and

    let e=document.getElementById("tnt")
    e.style.gridColumn=x
    e.style.gridColumn=y
    which will set an element at a particular grid co-ordinate

    dont forget both me and the bomb are simply part of the screen grid.. maybe the div needs to be removed at the bomb co-ords and reintroduced at my location?
    

    


              




    }



