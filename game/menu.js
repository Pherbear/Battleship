import character_selection from './character_selection.js'
import {gameplay} from './gameplay.js'
import settings from './settings.js'



export default function menu(save = null) {

    let game = document.getElementById('game')
    game.innerHTML = `
        <div class="screen">
            <div id="start">
                <div id="logo" class="logo">
                    <img src="./assets/start-screen/title.jpg">  
                </div>
                <div id="options" class="buttons"></div>
            </div>
        </div>
    `

    //options that we can add here
    //you may add spaces to your options it will automatically add underscores
    //when calling the functions
    //ex. 'continue game' will call continue_game()

    let game_options = ['New Game', 'Player vs Player', 'Settings']
    if (save) {
        //adds continue option to game_options if there is a save file
        game_options.unshift('Continue Game')
    }
    
    let options = document.getElementById('options')
    for(let option of game_options) {
        //adding all the buttons to start menu
        let no_space = option.replace(/ /g,"_")

        options.innerHTML += `
        <div class="button_container">
            <img src="./assets/sprites/small_ship_right.jpg" class="left_side_button">
            <button id='${no_space}'></button>
        </div>
        `
        let style = document.getElementById(no_space).style

        style.backgroundImage = `url("./assets/buttons/${no_space}.png")`
        style.backgroundSize = `cover`
        style.backgroundPosition = `center`

    }

    let buttons = options.querySelectorAll('button')
    for(let button of buttons) {
        button.addEventListener("click", function(e) {
            let option = e.target.id
            console.log(e.target.id)
            switch(option){
                case 'New_Game':
                    character_selection()
                    break;
                case 'Player_vs_Player':
                    character_selection(true);
                    break;
                case 'Settings':
                    settings(save)
                    break;
                case 'Continue_Game':
                    gameplay(save)
                    break;
                default:
                    break;
            }
        })
    }
}
