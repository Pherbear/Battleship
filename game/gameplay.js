//enemyShips and playerShips consist of arrays (ships) of arrays (each ship block) that have 3 items [x-cords, y-cords, hit]
// if hit == 0, it has not been hit yet
// if hit == 1, it has been hit
// all hit needs to be 1 in order for the ship to sink
// the index of each ship corresponds to the same order they were loaded in
// index 0 = 1st ship, index 1 = 2nd ship etc etc

import { loadData, saveData } from "../save-state/save.js"
import character_selection from "./character_selection.js"
import menu from "./menu.js"


const gridSize = 10
let playerGrid = []
let enemyGrid = []
populateArray(gridSize, playerGrid)
populateArray(gridSize, enemyGrid)

let positions = []
let attackedCords = []
let currentTurn = 'player'

let playerModel
let enemyModel

let gameEnd = false

let data


export default function gameplay(save_state = null, playerCharacter = null){
    
    data = {
        positions: positions,
        attackedCords: attackedCords,
        playerCharacter: playerCharacter,
        currentTurn: currentTurn
    }

    //TODO: Create random generation for grid
    //here we will generate the grid, create enemy and player ships
    //will not load new positions if the game is loaded 
    //enemy and player will have 5 ships:
    // 3 ships 2 grid length
    // 1 ship 3 grid length
    // 1 ship 4 grid length
    
    let girl = {
        idleImage: '../assets/sprites/girl_model.png',
        flinchImage: '../assets/sprites/girl_flinch.png'
    }

    let boy = {
        idleImage: '../assets/sprites/boy_model.png',
        flinchImage: '../assets/sprites/boy_flinch.png'
    }
    
    if (save_state) {

        console.log(`${save_state} has been loaded!`)

        //TODO: this is a test for loading, this needs to be replaced
        //with actual save data, this data is hard coded currently
        // positions = [
        //         {x: 3, y: 2, direction: 'right', size: 4, affiliate: 'enemy', damage: []},
        //         {x: 3, y: 5, direction: 'down', size: 3, affiliate: 'enemy', damage: []},
        //         {x: 1, y: 5, direction: 'down', size: 2, affiliate: 'enemy', damage: []},
        //         {x: 7, y: 5, direction: 'down', size: 2, affiliate: 'enemy', damage: []},
        //         {x: 3, y: 9, direction: 'right', size: 2, affiliate: 'enemy', damage: []},
        //         {x: 3, y: 2, direction: 'down', size: 4, affiliate: 'player', damage: []},
        //         {x: 5, y: 3, direction: 'down', size: 3, affiliate: 'player', damage: []},
        //         {x: 1, y: 0, direction: 'right', size: 2, affiliate: 'player', damage: []},
        //         {x: 7, y: 2, direction: 'down', size: 2, affiliate: 'player', damage: []},
        //         {x: 1, y: 9, direction: 'right', size: 2, affiliate: 'player', damage: []},
        //     ]
        // attackedCords = ['3 2 enemy', '3 5 enemy', '2 6 enemy', '3 6 enemy', '3 7 enemy',
        //                  '1 0 player', '2 0 player']
        // playerCharacter = 'girl'
        // currentTurn = 'player'
        data = loadData()
        console.log(data)

        positions = data.positions
        attackedCords = data.attackedCords
        playerCharacter = data.playerCharacter
        currentTurn = data.currentTurn

    } else {
        console.log(`new game`)
        generatePositions()
    }

    if (playerCharacter == 'boy'){
        playerModel = boy
        enemyModel = girl
    } else if (playerCharacter == 'girl'){
        playerModel = girl
        enemyModel = boy
    }

    for (let ship of positions){
        for (let i = 0; i < ship.size; i++){
            ship.damage.push(0)
        }
    }

    //loading html to game
    let game = document.getElementById('game')
    game.innerHTML = `
    <div id="gameplay" class="gameplay">
        <div class="grid_container">
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
            <button id="force">Force Game Over</button>
        </div>
        <div>
            <div id="status" class="status">
                <div id="hit">Start Attacking!</div>
            </div>
            <div id="characters">
                <div id="player_model" class="character">
                    <div class="player_turn">
                        Player Turn
                        <img src="../assets/sprites/green_arrow.png" class="arrow">
                    </div>
                    <img src="${playerModel.idleImage}" class="player_image">
                </div>
                <div id="enemy_model" class="character">
                    <div class="enemy_turn">
                        Enemy Turn
                        <img src="../assets/sprites/red_arrow.png" class="arrow">
                    </div>
                    <img src="${enemyModel.idleImage}" class="enemy_image">
                </div>
            </div>
        </div>
    </div>
    `

    let player = game.querySelector(".player")
    let enemy = game.querySelector(".enemy")
    //here we are generating the ships based off the data we are given from
    //our save data or data generated by a new game


    for(const ship of positions){
        let affiliate = ship.affiliate
        let y = ship.y
        let x = ship.x
        
        let gridType
        let htmlsection

        if (affiliate == 'enemy') {
            gridType = enemyGrid
            htmlsection = enemy
        }
        else if (affiliate == 'player') {
            gridType = playerGrid
            htmlsection = player
        }

        if (ship.direction == 'down'){
            for (let i = 0; i < ship.size; i++){
                gridType[x][y+i] = [ship, i]
            }
        }     
        else if (ship.direction == 'right'){
            for (let i = 0; i < ship.size; i++){
                gridType[x+i][y] = [ship, i]
            }
        }
        htmlsection.querySelector(".grid").innerHTML += generateShip(ship)
        game.querySelector(".status").innerHTML += generateShipHTML(ship)
    }


    //load grid into game once generation or file has been loaded for both player and enemy
    loadgrid(enemyGrid, 'enemy')
    loadgrid(playerGrid, 'player')
    
    //adding eventlistener to players and enemy grid
    //check out the gridMissle() function
    let elements = document.querySelectorAll(".enemy .gridItem")

    for(const element of elements){
        element.addEventListener("click", clickedAttack)
    }
    document.querySelector('#force').addEventListener("click", forceGameOver)
    attackFromLoad(attackedCords)
    switchView(currentTurn)
}


let delay = false

function switchTurns(){
    if(currentTurn == 'enemy') currentTurn = 'player'
    else if (currentTurn == 'player') currentTurn = 'enemy'

    delay = true
    
    setTimeout(function(){
        delay = false
        switchView(currentTurn)
        if(currentTurn == 'enemy'){
            setTimeout(function(){
                randomAttack()
            }, 500)
        }
    }, 1000)    

}

function randomAttack(){
    if (delay) return

    let x = Math.floor(Math.random() * 10)
    let y = Math.floor(Math.random() * 10)

    while (attackedCords.includes(`${x} ${y} player`)) {
        x = Math.floor(Math.random() * 10)
        y = Math.floor(Math.random() * 10)
    }

    attackedCords.push(`${x} ${y} player`)
    
    let targetElement = document.getElementById(`${x} ${y} player`)
    gridMissle(targetElement)
}

function clickedAttack(e){
    if (delay) return

    let target = e.target
    attackedCords.push(target.id)
    gridMissle(target)
}
//currently this event listener is for the grid, it will show the cordinates of
//the selected item in console and change the color of the clicked grid item

function gridMissle(target, fromLoad = false){
    if (gameEnd) return
    //cords is going to get the id
    //from the grid itself. each id from the target in the grid comes with 3 pieces of 
    //data:
    //cords[0] = x
    //cords[1] = y
    //cords[2] = (enemy or player)
    let cords = target.id.split(" ")

    
    //status is the big text on the right that says "hit" or "miss"
    let status = document.getElementById("hit")
    
    let x = cords[0]
    let y = cords[1]
    //enemy or player
    let affiliate = cords[2]
    
    let ship
    let shipSectionIndex
    
    if (affiliate == 'enemy'){
        ship = enemyGrid[x][y][0]
        shipSectionIndex = enemyGrid[x][y][1]
    } else if (affiliate == 'player'){
        ship = playerGrid[x][y][0]
        shipSectionIndex = playerGrid[x][y][1]
    }
    
    if(ship){
        target.style.cssText = `background:red;opacity:0.5;`
        status.innerText = `Hit!`
        ship.damage[shipSectionIndex] = 1
        flinch(affiliate)
        isShipSunk(ship)
        gameover(ship)
    } else {
        target.style.cssText = `background:yellow;opacity:0.5;`
        status.innerText = `Miss!`
    }
    
    if (!fromLoad) {
        switchTurns()
        saveData(data)
    }
}

function switchView(affiliate){
    
    let player = game.querySelector(".player")
    let playerArrow = game.querySelector(".player_turn")

    let enemy = game.querySelector(".enemy")
    let enemyArrow = game.querySelector(".enemy_turn")
    

    if (affiliate == 'player'){
        player.style.display = "none"
        playerArrow.style.display = "flex"
        enemy.style.display = "block"
        enemyArrow.style.display = "none"
    } else if (affiliate == 'enemy'){
        enemy.style.display = "none"
        enemyArrow.style.display = "flex"
        player.style.display = "block"
        playerArrow.style.display = "none"
    }

}

//this function only generates the ship image, doesn't affect actual gameplay
function generateShip(ship){
    let x = ship.x
    let y = ship.y
    let direction = ship.direction
    let size = ship.size
    let targetx = x + 1
    let targety = y + 1
    let ship_type
    
    switch(size){
        case 4:
            ship_type = 'large'
            break;
        case 3:
            ship_type = 'medium'
            break;
        case 2:
            ship_type = 'small'
            break;
            default:
            ship_type = 'large'
            break;
    }

    if(direction == 'down'){
        targety += size
    } else if (direction == 'right'){
        targetx += size
    }
    
    let ship_image = `../assets/sprites/${ship_type}_ship_${direction}.jpg`
    
    let displayNone
    if(ship.affiliate == 'enemy') displayNone = `display: none;`
    
    let html = `
    <div class = "ship_container" id="ship${positions.indexOf(ship)}"
        style = "grid-area: ${y+1} / ${x+1} / ${targety} / ${targetx}; ${displayNone}">
        <img src="${ship_image}" class = "ship_image">
    </div>`
        
    return html
}

//this function generates the status of the ships on the right side of the game
//eg. Enemy Large Vessel: Active
function generateShipHTML(ship){
    let size = ship.size
    let affiliate = ship.affiliate
    let index = positions.indexOf(ship)
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
    
    let status = 'Active'
    let fullDamage = true
    let style = ''

    for(const damage of ship.damage){
        if (damage == 0) {
            fullDamage = false
        }
        if (damage == 1) {
            status = 'Damaged'
            style = 'style="color: yellow;"'
        }
    }
    
    if (fullDamage) {
        status = 'Inactive'
        style = 'style="color: red;"'
    }
    
    let capitalized = affiliate.charAt(0).toUpperCase() + affiliate.slice(1)

    let html = `<div id="${affiliate}_ship_${index}" class="ship_status">
    ${capitalized} ${shipType} Vessel: <a ${style}>${status}</a>
    </div>`
    
    return html
}

function populateArray(size, array){
    for(let i = 0; i < size; i++){
        let inner = []
        for(let j = 0; j < size; j++){
            inner.push([''])
        }
        array.push(inner)
    }
}

function isShipSunk(ship){

    let affiliate = ship.affiliate
    let index = positions.indexOf(ship)
    let id = `ship${index}`
    
    let boat_image = document.getElementById(id)

    let ship_html = document.getElementById(`${affiliate}_ship_${index}`).querySelector("a")
    ship_html.innerText = "Damaged"
    ship_html.style.color = "yellow"
    
    for(const section of ship.damage){
        if(section == 0) return 
    }

    boat_image.style.display = "block"
    ship_html.innerText = "Inactive"
    ship_html.style.color = "red"
}

function groupPlayers(positions, prop)
{
    var grouped = {};
    for (var i=0; i< positions.length; i++)
    {
        var p = positions[i][prop];
        if (!grouped[p]) 
        { 
            grouped[p] = []; 
        }
        grouped[p].push(positions[i]);
    }
  return grouped
}


function gameover(myShip, forcegameover = false)
{
    let gameover
    let players = groupPlayers(positions, 'affiliate')

    if(!forcegameover){
        if(myShip.affiliate == 'enemy')
        {
            for(const ship of players.enemy)
            {
                for(let i = 0; i < ship.damage.length; i++)
                {
                    if(ship.damage[i] == 1)
                    {
                        gameover = true
                    }
                    else
                    {
                        gameover = false
                        return
                    }
                }
            }
        }
        else if(myShip.affiliate == 'player')
        {
            for(const ship of players.player)
            {
                for(let i = 0; i < ship.damage.length; i++)
                {
                    if(ship.damage[i] == 1)
                    {
                        gameover = true
                    }
                    else
                    {
                        gameover = false
                        return
                    }
                }
            }
        }
    }

    if(gameover || forcegameover)
    {
        gameEnd = true
        let game = document.getElementById("game")
        game.innerHTML += `
            <div id="popup">
                <h1>Game Over</h1>
                <div id="options"></div>
            </div>`

        let game_options = ['RETRY', 'EXIT']
        
        
        let options = document.getElementById('options')
        for(let option of game_options) {
            //adding all the buttons to start menu
            options.innerHTML += `<button class="button">${option}</button>`
        }
    
        let buttons = options.querySelectorAll('button')
        for(let button of buttons) {
            button.addEventListener("click", function(e) {
                let option = e.target.innerText
                switch(option){
                    case 'RETRY':
                        reset()
                        character_selection()
                        break;
                    case 'EXIT':
                        reset()
                        menu()
                        break;
                    default:
                        break;
                }
            })
        }

        // alert("game over")
    }
}

function forceGameOver(){
    console.log('force game over')
    gameover(positions[0], true)
}

function loadgrid(grid, affiliate){
    let element

    if(affiliate == 'enemy'){
        element = document.querySelector('.enemy')
    } else if (affiliate == 'player'){
        element = document.querySelector('.player')
    }

    for (let y = 0; y < grid.length; y++) {
        for(let x = 0; x < grid[y].length; x++){
            let item = `<div class="gridItem" id="${x} ${y} ${affiliate}"></div>`
            element.querySelector(".grid").innerHTML += item
        }
    }
}

function attackFromLoad(){
    let element
    for(const cords of attackedCords){
        element = document.getElementById(cords)
        gridMissle(element, true)
    }
}

function generatePositions(){
    let shipOnSide = 5
    let shipSizes = [4,3,2,2,2]

    for(let i = 0; i < (shipOnSide * 2); i++){
        let item = {x:0,y:0,direction:'',size:0,affiliate:'',damage:[]}
        let cords
        
        if (i >= shipOnSide){
            item.affiliate = 'enemy'
            item.size = shipSizes[i-5]
            cords = generateCords('enemy', item.size)
        } else {
            item.affiliate = 'player'
            item.size = shipSizes[i]
            cords = generateCords('player', item.size)
        }   
        item.x = cords.x
        item.y = cords.y
        item.direction = cords.direction
        positions.push(item)
    }
}

let playerCordsUsed = []
let enemyCordsUsed = []

function generateCords(affiliate, size){
    let cordsUsed
    let cords = {x:0, y:0, direction:'right'}

    if (affiliate == 'enemy'){
        cordsUsed = playerCordsUsed
    } else if (affiliate == 'player'){
        cordsUsed = enemyCordsUsed
    }
    let direction
    let random
    let x
    let y
    let regen = true

    let testCords = []

    while(regen){

        testCords = []
        regen = false

        random = Math.floor(Math.random() * 2)
        x = Math.floor(Math.random() * 10)
        y = Math.floor(Math.random() * 10)

        if (random){
            direction = 'right'
            for (let i = 0; i < size; i++){
                testCords.push(`${x+i}${y}`)
                if ((x+i) > 9) regen = true
            }
        } else {
            direction = 'down'
            for (let i = 0; i < size; i++){
                testCords.push(`${x}${y+i}`)
                if ((y+i) > 9) regen = true
            }
        }
        for(const cord of testCords){
            if(cordsUsed.includes(cord)){
                regen = true
            }
        }
    }

    cordsUsed.push.apply(cordsUsed, testCords)
    cords.x = x
    cords.y = y
    cords.direction = direction
    return cords
}

function flinch(affiliate){

    let element= document.querySelector(`.${affiliate}_image`)
    let flinchImage
    let idleImage

    if(affiliate == 'enemy'){
        idleImage = enemyModel.idleImage
        flinchImage = enemyModel.flinchImage
    } else if (affiliate == 'player'){
        idleImage = playerModel.idleImage
        flinchImage = playerModel.flinchImage
    }

    element.src = `${flinchImage}`
    element.classList.add("damage")

    setTimeout(function(){
        element.classList.remove("damage")
        element.src = `${idleImage}`
    }, 1000)

}

function reset()
{
    playerGrid = []
    enemyGrid = []
    populateArray(gridSize, playerGrid)
    populateArray(gridSize, enemyGrid)

    positions = []
    attackedCords = []
    currentTurn = 'player'

    playerCordsUsed = []
    enemyCordsUsed = []

    gameEnd = false
}