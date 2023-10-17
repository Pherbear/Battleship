

let playerGrid = new Array(10).fill(new Array(10).fill('content'))
let enemyGrid = new Array(10).fill(new Array(10).fill('content'))

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
            enemyPositions: {},
            playerPositions: {}
        }

    } else {
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
    </div>
    `

    let player = game.querySelector(".player")
    let enemy = game.querySelector(".enemy")

    for (let x = 0; x < playerGrid.length; x++) {
        for(let y = 0; y < playerGrid[x].length; y++){
            let item = `
            <div class="gridItem" id="${x} ${y}">${playerGrid[x][y]}</div>
            `
            player.querySelector(".grid").innerHTML += item
        }
    }

    let playerElements = player.querySelectorAll(".gridItem")
    for(const element of playerElements){
        element.addEventListener("click", eventListener)
    }

    for (let x = 0; x < enemyGrid.length; x++) {
        for(let y = 0; y < enemyGrid[x].length; y++){
            let item = `
            <div class="gridItem" id="${x} ${y}">${enemyGrid[x][y]}</div>
            `
            enemy.querySelector(".grid").innerHTML += item
        }
    }


    //player.style.display = "none"
    enemy.style.display = "none"
}

function eventListener(e){
    let cords = e.target.id.split(" ")
    console.log(cords)
}