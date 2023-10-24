//this is going to be the code that organizing all of our functions
//we will import all of our functions from our ./game folder

//im thinking we have seperate files for player, enemy, battle logic

//thinking about doing both singleplayer mode and vs mode but going to
//priortize singleplayer first and see what we can do from there

//import player from './game/player'
//import enemy from './game/enemy'
//import battle-logic from './game/battle-logic'
import menu from './game/menu.js'
import gameplay from './game/gameplay.js'
import {loadData} from './save-state/save.js'

export default function game() {
    //will check if there is a save state and load it
    
    //boolean for save_data loaded
    let save_data = loadData()

    //this calls menu() imported from ./game/menu.js, 
    //which loads the main menu
    menu(save_data)

    //uncomment this to work on gameplay and skip menu
    //gameplay(save_data)
}


game()
