import game from '../main.js'
import { clearGameData } from '../save-state/save.js'
import menu from './menu.js'

export default function settings(save = null){

    let game = document.getElementById('game')
    game.innerHTML = `
        <div class="screen">
            <div id="start">
            </div>
            <div id="options" class="buttons"></div>
        </div>
    `

    let game_options = ['clear save data', 'Back']
    
    let options = document.getElementById('options')
    for(let option of game_options) {
        //adding all the buttons to start menu
        options.innerHTML += `<button>${option}</button>`
    }

    options.style.paddingTop = "250px"

    let buttons = options.querySelectorAll('button')
    for(let button of buttons) {
        button.addEventListener("click", function(e) {
            let option = e.target.innerText
            switch(option){
                case 'clear save data':
                    clearGameData()
                    save = null
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
