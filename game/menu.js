//TODO: implement start menu and random generation for battleships
//TODO: check if save data is loaded, give player option to continue if so
import load_game from './load-game.js'


export default function menu(save) {

    let game = document.getElementById('game')
    game.innerHTML = `
        <div id="start">
            <div id="logo" class="logo">
                <img src="./assets/start-screen/title.jpg">
            </div>
            <div id="options" class="buttons"></div>
        </div>
    `

    //options that we can add here
    //you may add spaces to your options it will automatically add underscores
    //when calling the functions
    //ex. 'continue game' will call continue_game()

    let game_options = ['start', 'settings']
    if (save) {
        //adds continue option to game_options if there is a save file
        game_options.unshift('continue game')
    }
    
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
                case 'start':
                    load_game()
                    break;
                case 'settings':
                    console.log('settings')
                    break;
                case 'continue game':
                    load_game(save)
                    break;
                default:
                    break;
            }
        })
    }
}
