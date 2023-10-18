const gridSize = 10

let playerGrid = []
let enemyGrid = []

for(let i = 0; i < gridSize; i++){
    let inner = []
    for(let j = 0; j < gridSize; j++){
        inner.push('')
    }
    enemyGrid.push(inner)
}

for(let i = 0; i < gridSize; i++){
    let inner = []
    for(let j = 0; j < gridSize; j++){
        inner.push('')
    }
    playerGrid.push(inner)
}


let viewingPlayer = true

export default function gameplay(save_state = null) {
    
    let positions = {
        enemyPositions: {},
        playerPositions: {}
    }
    
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
            enemyPositions: [
                {x: 5, y: 5, direction: 'down', size: 4},
                {x: 3, y: 5, direction: 'down', size: 3},
                {x: 1, y: 5, direction: 'down', size: 2},
                {x: 7, y: 5, direction: 'down', size: 2},
                {x: 3, y: 9, direction: 'right', size: 2},
            ],
            playerPositions: [
                {x: 5, y: 5, direction: 'down', size: 4},
                {x: 3, y: 5, direction: 'down', size: 3},
                {x: 1, y: 5, direction: 'down', size: 2},
                {x: 7, y: 5, direction: 'down', size: 2},
                {x: 3, y: 9, direction: 'right', size: 2},
            ]
        }
    } else {
        //TODO: generate cordinates of new game
        console.log(`new game`)
    }
    
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
            
    for(const ship of positions.enemyPositions){
        let y = ship.y
        let x = ship.x

        if (ship.direction == 'down'){
            for (let i = 0; i < ship.size; i++){
                enemyGrid[x][y+i] = 'ship'
            }
            player.querySelector(".grid").innerHTML += `
            <div class = "ship_container"
                style = "grid-area: ${y+1} / ${x+1} / ${y+1+ship.size} / ${x+1};">
                <img src="../assets/sprites/ship_down.jpg"
                    class = "ship_image">
            </div>
            `
        }     
        else if (ship.direction == 'right'){
            for (let i = 0; i < ship.size; i++){
                enemyGrid[x+i][y] = 'ship'
            }
            player.querySelector(".grid").innerHTML += `
            <div class = "ship_container"
                style = "grid-area: ${y+1} / ${x+1} / ${y+1} / ${x+1+ship.size};">
                <img src="../assets/sprites/ship_right.jpg"
                    class = "ship_image">
            </div>
            `
        }
    }


    for(const ship of positions.playerPositions){
        let y = ship.y
        let x = ship.x

        if (ship.direction == 'down'){
            for (let i = 0; i < ship.size; i++){
                playerGrid[x][y+i] = 'ship'
            }  
        }     
        else if (ship.direction == 'right'){
            for (let i = 0; i < ship.size; i++){
                playerGrid[x+i][y] = 'ship'
            } 
        }
    }
    


    //TODO: load grid into game once generation or file has been loaded
    
    
    for (let y = 0; y < playerGrid.length; y++) {
        for(let x = 0; x < playerGrid[y].length; x++){
            let item = `
            <div class="gridItem" id="${x} ${y} player">${playerGrid[x][y]}</div>
            `
            player.querySelector(".grid").innerHTML += item
        }
    }
    
    for (let y = 0; y < enemyGrid.length; y++) {
        for(let x = 0; x < enemyGrid[y].length; x++){
            let item = `
            <div class="gridItem" id="${x} ${y} enemy">${enemyGrid[x][y]}</div>
            `
            enemy.querySelector(".grid").innerHTML += item
        }
    }
    
    //adding eventlistener to players and enemy grid
    let elements = document.querySelectorAll(".gridItem")
    for(const element of elements){
        element.addEventListener("click", eventListener)
    }

    //adding event listener to switch view button
    enemy.style.display = "none"
    //player.style.display = "none"
    let button = game.querySelector("button")
    button.addEventListener("click", switchView)
}

//currently this event listener is for the grid, it will show the cordinates of
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