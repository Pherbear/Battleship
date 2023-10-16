//TODO: implement start menu and random generation for battleships
//TODO: check if save data is loaded, give player option to continue if so

export default function start(save) {
    let game = document.getElementById('game')
    game.innerHTML = `
        <div id="start">
            <div id="logo">
                <img src="./assets/start-screen/title.jpg">
            </div>
            <div id="options"></div>
        </div>
    `

    let options = document.getElementById('options')

    options.innerHTML = `<ul></ul>`
    let game_options = ['start', 'settings']

    if (save) {
        //adds continue option is there is a save file
        game_options.unshift('continue')
    }
    
    for(let option of game_options) {
        options.querySelector('ul').innerHTML += `<li>${option}</li>`
    }

    let all_options = options.querySelectorAll('li')

    //TODO: trying to get these event listeners to work smh
    for (let option of all_options){
        option.addEventListener("click", console.log(option.innerText))
    }

}