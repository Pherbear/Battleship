export default function load_game(save_state = null) {
    
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
    <div id="gameplay">
        <div class="grid">
        hello change
        </div>
    </div>
    `

}
