import game from '../main.js'
import { clearGameData } from '../save-state/save.js'
import menu from './menu.js'
import {gameplay, adjustTimer} from './gameplay.js'

export default function settings(save = null){

    let game = document.getElementById('game')
    game.innerHTML = `
        <div class="screen">
            <h1>Settings</h1>
            <div id="start">
            </div>
            <div id="options" class="buttons"></div>
        </div>
    `
    let game_options = ['clear save data', 'back']
    
    let options = document.getElementById('options')

    let speed_options = ['SLOW', 'NORMAL', 'FAST']

    options.innerHTML = 
    `<div class="speed_settings speed_container" id="speed_settings"> 
        <div>Game Speed:</div>
    </div>`
        
    for (let speed of speed_options){
        let item = document.getElementById('speed_settings')

        item.innerHTML += `<button id='${speed}'></button>`

        let style = document.getElementById(speed).style

        style.backgroundImage = `url("./assets/buttons/${speed}.png")`
        style.backgroundSize = `cover`
        style.backgroundPosition = `center`

    }


    for(let option of game_options) {
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
    }

    let buttons = options.querySelectorAll('button')

    for(let button of buttons) {
        button.addEventListener("click", function(e) {
            let option = e.target.id
            switch(option){
                case 'clear_save_data':
                    clearGameData()
                    save = null
                case 'SLOW':
                    adjustTimer(700);
                    break;
                case 'NORMAL':
                    adjustTimer(500);
                    break;
                case 'FAST':
                    adjustTimer(50);
                    break;
                case 'back':
                    menu(save)
                    break;
                default:
                    break;
            }
        })
    }

    let buttonIcon = document.querySelectorAll('h1')
    console.log(buttonIcon)
}
