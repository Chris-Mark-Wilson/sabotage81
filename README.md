# React + Vite

work to date..

uxb boxes grid co-ordinates held in state in an array - "boxes"
position of boxes determined randomly on 1st render via a useState function. max 300 boxes to start. Function checks to see if it is trying to place a box over an existing box, if so it increases the maxboxes by 1 to ensure 300 boxes get placed on the screen.
This may be the cause of a glitch that appears when in certain areas of the screen, there may well be 2 "divs" at that same co-ordinate..
Its not a 'bug'.. its a feature 
 edit: made the duplication functionality bulletproof so "no more doubledivs..."

collision detection by comparing grid co-ordinates of required move to array, if co-ordinates exist in array, no move is possible as this means the grid square you are attempting to move into contains a uxb box..

keys to move are q-up, a-down, o-left, p-right, space - set bomb
more zxSpectrum than zx81 but I prefer the chuckie egg layout 

trying to create a new div on the fly to serve as the 'bomb', isnt working at the minute... next job... fix it...
solution (dreampt up while trying to sleep) - carry the bomb with you, you always had it anyway, isnt that the point of the game? then just set a setTimeout(countdown,1000) to tick the bomb and when it reaches zero... BOOOOOM 
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

    OMG! I wish I knew more about state etc..
    so..
    what was happening is the bomb xy state and my xy state were not coherent during the 'ticking' function. I could "run away" but my state wasnt being updated properly and when the bomb went off, it thought my position was where i left the bomb, but it wasnt.. I'd ran away..

    after much head scratching and 3 gallons of coffee, I set the keydown functions to set the bomb xy state to MY state rather than update the bomb xy state... and thats 'cured' the problem..
    although it may be a hack... it worked...

    now for a break...
    after break...
    make the recursive "boomTime" function or more to the point the "removeBox" function that is called by the setBoxes state function within the boomtime function... to show some graphical explosions..


        right then..

        get an array of all the actual tnt elements with 
        document.getElementsByClassName("tnt")

        now i can point to or look at all the tnt boxes..
        so that means i can change their properties..
        
        right now Im looking through the test array which is the surrounding area of the particular tnt (or bomb for first time round)

        which means I have the grid co-ordinates of that area

        so, if I look through the tnt array and compare it to the test array and find a match, I can alter that tnt box to look like an explosion, Ill use an emoji for now..

        so lets slow things down a bit, use a setTimeout somwhow...

        ok, lets say we find a match..

        call a "poof!" function...
        that "poof! function will change that elements text property to an explosion emoji, then setTimeout(turnItBackToSpace,250? say?)

        will that work in react on its own without needing to return the element? or will i need to do this asyncronously returning the div at the end of the timeout being executed on the stack?

        only one way to find out...

        realising as Im writing this functionality that ive already tested whether we have a "match" by literally comparing arrays to pass to the removeBox() function.. the difference is that im jus removing the array index from "boxes", Im not referencing the element directly.. react is looking after the rest.. all im doing is passing the tnt box's index in the array to 
        removeBox(index)..

        hmm..

        lets just quick write a poof funtion and see what happens...
        i can pass to actual element itself to poof()...
        didnt work.. spectacular failure tbh..
        its all to do with how react renders components, divs, whatever.. need to do some homework...
        ok dunno why I didnt think if this before but the only thing being held in state thats uxb related is the array of grid coordinates..
        not the actual elements themselves so that when I change or try to change the appearace it doesnt work... but how come I can change the bomb countdown then?
        what If I hold the text of each tnt div in state in the same array that holds its grid co-ordinates? shouldnt react then rerender each div that changes its text?
        that didnt work either....
        
        





