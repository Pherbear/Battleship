//this is going to be the code that organizing all of our functions
//we will import all of our functions from our ./game folder

//im thinking we have seperate files for player, enemy, battle logic

//thinking about doing both singleplayer mode and vs mode but going to
//priortize singleplayer first and see what we can do from there

//import player from './game/player'
//import enemy from './game/enemy'
//import battle-logic from './game/battle-logic'

function game() {
    //will check if there is a save state and load it
    //TODO: import save_data from save-state
    let save_data = false
    if (save_data) {
        //load save_data
        //TODO: implement save_data into current game
    }
    //game starts and ends here
    let game = document.getElementById('game')
    //TODO: implement start menu
    //TODO: load game here
    //TODO: save current game
    //TODO: implement game over screen
}

game()
