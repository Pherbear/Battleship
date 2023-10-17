

let playerGrid = new Array(10).fill(new Array(10).fill('content'))
let enemyGrid = new Array(10).fill(new Array(10).fill('content'))

let viewingPlayer = true


export default function gameplay(save_state = null) {
    
    let positions = {
        enemyPositions: {},
        playerPositions: {}
    }
    
    console.log(positions)
    
    //TODO: Create random generation for grid
    //here we will generate the grid, create enemy and player ships
    //will not load new positions if the game is loaded 
    //enemy and player will have 5 ships:
    // 3 ships 2 grid length
    // 1 ship 3 grid length
    // 1 ship 4 grid length
    
    if (save_state) {
        console.log(`${save_state} has been loaded!`)

        //this is a test for loading, this needs to be replaced
        //with actual save data
        positions = {
            enemyPositions: {
                bigship: {},
                mediumship: {},
                smallship1: {},
                smallship2: {},
                smallship3: {}
            },
            playerPositions: {
                bigship: {},
                mediumship: {},
                smallship1: {},
                smallship2: {},
                smallship3: {}
            }
        }
        
    } else {
        //TODO: generate cordinates of new game
        console.log(`new game`)
    }

    //TODO: load grid into game once generation or file has been loaded
    
    let game = document.getElementById('game')
    game.innerHTML = `
    <div id="gameplay" class="gameplay">
        <div class="player">
            Player's grid:
            <div class="grid">
            </div>
        </div>
        <div class="enemy">
            Enemy's grid:
            <div class="grid">
            </div>
        </div>
        <button>Switch View</button>
    </div>
    `
    
    let player = game.querySelector(".player")
    let enemy = game.querySelector(".enemy")
    
    for (let y = 0; y < playerGrid.length; y++) {
        for(let x = 0; x < playerGrid[y].length; x++){
            let item = `
            <div class="gridItem" id="${x} ${y}">${playerGrid[x][y]}</div>
            `
            player.querySelector(".grid").innerHTML += item
        }
    }
    
    for (let x = 0; x < enemyGrid.length; x++) {
        for(let y = 0; y < enemyGrid[x].length; y++){
            let item = `
            <div class="gridItem" id="${x} ${y}">${enemyGrid[x][y]}</div>
            `
            enemy.querySelector(".grid").innerHTML += item
        }
    }
    
    //adding eventlistener to players and enemy grid
    let playerElements = player.querySelectorAll(".gridItem")
    for(const element of playerElements){
        element.addEventListener("click", eventListener)
    }

    let enemyElements = enemy.querySelectorAll(".gridItem")
    for(const element of enemyElements){
        element.addEventListener("click", eventListener)
    }

    //adding event listener to switch view button
    enemy.style.display = "none"
    let button = game.querySelector("button")
    button.addEventListener("click", switchView)
}


//currently this event listener is for the player, it will show the cordinates of
//the selected item in console
function eventListener(e){
    let cords = e.target.id.split(" ")
    console.log(cords)
}

function switchView(){

    let player = game.querySelector(".player")
    let enemy = game.querySelector(".enemy")

    if (viewingPlayer){
        player.style.display = "none"
        enemy.style.display = "block"
        viewingPlayer = false
    } else {
        enemy.style.display = "none"
        player.style.display = "block"
        viewingPlayer = true
    }

}