import gameplay from "./gameplay.js"

export default function character_selection(){

    let game = document.getElementById('game')
    game.innerHTML = `
        <div class="screen">
            <div id="start">
                <div id="logo" class="logo">
                    <img src="./assets/start-screen/title.jpg">  
                </div>
                <div class="character_selection">
                    <a>Choose Your Character:</a>
                    <div class="characters">
                        <img src="../assets/sprites/boy_model.png" id="boy">
                        <img src="../assets/sprites/girl_model.png" id="girl">
                    </div>
                </div>
            </div>
        </div>
    `

    document.getElementById('boy').addEventListener("click", listener)
    document.getElementById('girl').addEventListener("click", listener)
}

function listener(e){
    gameplay(null, e.target.id)
}