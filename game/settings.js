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
    let game_options = ['SLOW', 'NORMAL', 'FAST', 'clear save data', 'Back']
    
    let options = document.getElementById('options')
    for(let option of game_options) {
        //adding all the buttons to start menu
        options.innerHTML += `<button>${option}</button>`
    }

    let buttons = options.querySelectorAll('button')
    for(let button of buttons) {
        button.addEventListener("click", function(e) {
            let option = e.target.innerText
            switch(option){
                case 'clear save data':
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
                case 'Back':
                    menu(save)
                    break;
                default:
                    break;
            }
        })
    }
}
