const gridSize = 10

let playerGrid = []
let enemyGrid = []

for(let i = 0; i < gridSize; i++){
    let inner = []
    for(let j = 0; j < gridSize; j++){
        inner.push([''])
    }
    enemyGrid.push(inner)
}

for(let i = 0; i < gridSize; i++){
    let inner = []
    for(let j = 0; j < gridSize; j++){
        inner.push([''])
    }
    playerGrid.push(inner)
}


let viewingPlayer = false

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
                {x: 3, y: 2, direction: 'right', size: 4},
                {x: 3, y: 5, direction: 'down', size: 3},
                {x: 1, y: 5, direction: 'down', size: 2},
                {x: 7, y: 5, direction: 'down', size: 2},
                {x: 3, y: 9, direction: 'right', size: 2},
            ],
            playerPositions: [
                {x: 3, y: 2, direction: 'down', size: 4},
                {x: 5, y: 3, direction: 'down', size: 3},
                {x: 1, y: 0, direction: 'right', size: 2},
                {x: 7, y: 2, direction: 'down', size: 2},
                {x: 1, y: 9, direction: 'right', size: 2},
            ]
        }
    } else {
        //TODO: generate cordinates of new game
        console.log(`new game`)
    }
    
    let game = document.getElementById('game')
    game.innerHTML = `
    <div id="gameplay" class="gameplay">
        <div>
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
        <div id="status" class="status">
            <div id="hit">Start Attacking!</div>
        </div>
    </div>
    `
    let player = game.querySelector(".player")
    let enemy = game.querySelector(".enemy")

    //enemyCords and playerCords consist of arrays (ships) of arrays (each ship block) that have 3 items [x-cords, y-cords, hit]
    // if hit == 0, it has not been hit yet
    // if hit == 1, it has been hit
    // all hit needs to be 1 in order for the ship to sink

    let enemyCords = []
    let playerCords = []
            
    for(const ship of positions.enemyPositions){
        let index = positions.enemyPositions.indexOf(ship)
        let y = ship.y
        let x = ship.x
        let shipcords = []
        if (ship.direction == 'down'){
            for (let i = 0; i < ship.size; i++){
                enemyGrid[x][y+i] = ['ship', index]
                shipcords.push([x,y+i,0])
            }
            enemy.querySelector(".grid").innerHTML += generateShip(x, y, ship.direction, ship.size)
            game.querySelector(".status").innerHTML += generateShipHTML(ship.size, 'Enemy')
        }     
        else if (ship.direction == 'right'){
            for (let i = 0; i < ship.size; i++){
                enemyGrid[x+i][y] = ['ship', index]
                shipcords.push([x+i,y,0])
            }
            enemy.querySelector(".grid").innerHTML += generateShip(x, y, ship.direction, ship.size)
            game.querySelector(".status").innerHTML += generateShipHTML(ship.size, 'Enemy')
        }
        enemyCords.push(shipcords)
    }

    for(const ship of positions.playerPositions){
        let index = positions.playerPositions.indexOf(ship)
        let y = ship.y
        let x = ship.x
        let shipcords = []
        if (ship.direction == 'down'){
            for (let i = 0; i < ship.size; i++){
                playerGrid[x][y+i] = ['ship', index]
                shipcords.push([x,y+i,0])
            }  
            player.querySelector(".grid").innerHTML += generateShip(x, y, ship.direction, ship.size)
            game.querySelector(".status").innerHTML += generateShipHTML(ship.size, 'Player')

        }
        else if (ship.direction == 'right'){
            for (let i = 0; i < ship.size; i++){
                playerGrid[x+i][y] = ['ship', index]
                shipcords.push([x+i,y,0])
            } 
            player.querySelector(".grid").innerHTML += generateShip(x, y, ship.direction, ship.size)
            game.querySelector(".status").innerHTML += generateShipHTML(ship.size, 'Player')
        }
        playerCords.push(shipcords)
    }

    console.log(enemyCords, playerCords)

    //load grid into game once generation or file has been loaded
    for (let y = 0; y < playerGrid.length; y++) {
        for(let x = 0; x < playerGrid[y].length; x++){
            let item = `<div class="gridItem" id="${x} ${y} player"></div>`
            player.querySelector(".grid").innerHTML += item
        }
    }
    
    for (let y = 0; y < enemyGrid.length; y++) {
        for(let x = 0; x < enemyGrid[y].length; x++){
            let item = `<div class="gridItem" id="${x} ${y} enemy"></div>`
            enemy.querySelector(".grid").innerHTML += item
        }
    }
    
    //adding eventlistener to players and enemy grid
    //later i want to take off the option to attack yourself XD
    let elements = document.querySelectorAll(".gridItem")
    for(const element of elements){
        element.addEventListener("click", gridMissle)
    }

    //adding event listener to switch view button
    //enemy.style.display = "none"
    player.style.display = "none"
    let button = game.querySelector("button")
    button.addEventListener("click", switchView)
}

//currently this event listener is for the grid, it will show the cordinates of
//the selected item in console and change the color of the clicked grid item

function gridMissle(e){
    let cords = e.target.id.split(" ")
    let target = e.target
    console.log(cords)
    console.log(target)

    target.style.cssText = `
        background: red;
        opacity: 0.5;
    `

    let status = document.getElementById("hit")
    let tile

    if (cords[2] == 'enemy'){
        tile = enemyGrid[cords[0]][cords[1]]
    } else if (cords[2] == 'player'){
        tile = playerGrid[cords[0]][cords[1]]
    }

    if(tile[0] == 'ship'){
        status.innerText = `Hit!`
    } else {
        status.innerText = `Miss!`
    }

    if (hit) {
        //TODO: check if the entire ship has been hit
    }
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

function generateShip(x, y, direction, size){
    let targetx = x + 1
    let targety = y + 1

    if(direction == 'down'){
        targety += size
    } else if (direction == 'right'){
        targetx += size
    }

    let html = `
    <div class = "ship_container"
        style = "grid-area: ${y+1} / ${x+1} / ${targety} / ${targetx};">
        <img src="../assets/sprites/ship_${direction}.jpg"
            class = "ship_image">
    </div>
    `
    
    return html
}

function generateShipHTML(size, affiliate){
    let shipType = ``

    switch(size){
        case 4:
            shipType = `Large`
            break;
        case 3:
            shipType = 'Medium'
            break;
        case 2:
            shipType = 'Small'
            break;
        default:
            shipType = 'Unknown'
            break;
    }
    
    let html = `<div id="Ship1" class="ship_status">${affiliate} ${shipType} Vessel: <a>Active</a></div>`

    return html
}