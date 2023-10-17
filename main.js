//this is going to be the code that organizing all of our functions
//we will import all of our functions from our ./game folder

//im thinking we have seperate files for player, enemy, battle logic

//thinking about doing both singleplayer mode and vs mode but going to
//priortize singleplayer first and see what we can do from there

//import player from './game/player'
//import enemy from './game/enemy'
//import battle-logic from './game/battle-logic'
import menu from './game/menu.js'
import load_game from './game/load-game.js'

function continue_game(){
    load_game(save_state)
}

function start(){
    load_game()
}

function settings(){
    console.log("settings")
}

let positions

function game() {
    //will check if there is a save state and load it
    //TODO: import save_data from save-state
    
    //boolean for save_data loaded
    let save_data = true
    let save_state = ''
    if (save_data) {
        //load save_data
        //TODO: implement save_data into current game
        save_state = 'save data 555'
    }
    //game starts and ends here
    let game = document.getElementById('game')

    //this calls start() imported from ./game/menu.js, 
    //which loads the main menu
    positions = menu(save_state)
    load_game(save_state)
    console.log(positions)

    //TODO: save current game
    //TODO: implement game over screen
}


game()
