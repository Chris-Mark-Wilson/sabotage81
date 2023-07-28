# React + Vite

work to date..

uxb boxes grid co-ordinates held in state in an array - "boxes"
position of boxes determined randomly on 1st render via a useState function. max 300 boxes to start. Function checks to see if it is trying to place a box over an existing box, if so it increases the maxboxes by 1 to ensure 300 boxes get placed on the screen.
This may be the cause of a glitch that appears when in certain areas of the screen, there may well be 2 "divs" at that same co-ordinate..

collision detection by comparing grid co-ordinates of required move to array, if co-ordinates exist in array, no move is possible as this means the grid square you are attempting to move into contains a uxb box..

keys to move are q-up, a-down, o-left, p-right
more zxSpectrum than zx81 but I prefer the chuckie egg layout ;)
