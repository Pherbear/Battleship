function saveData(data){   
    localStorage.setItem('positions', JSON.stringify(data.positions));
    localStorage.setItem('attackedCords', JSON.stringify(data.attackedCords));
    localStorage.setItem('playerCharacter', data.playerCharacter);
    localStorage.setItem('currentTurn', data.currentTurn);
}

function loadData(){

    let data = {
        positions: null,
        attackedCords: null,
        playerCharacter: null,
        currentTurn: null,
    }

    if (storageAvailable("localStorage")) {
        // Yip kai yay mofo's get ready for the best battleship game ever 
        // To retrieve the saved game state:
        if (localStorage.getItem('positions')) {
            data.positions = JSON.parse(localStorage.getItem('positions'));
            data.attackedCords = JSON.parse(localStorage.getItem('attackedCords'));
            data.playerCharacter = localStorage.getItem('playerCharacter');
            data.currentTurn = localStorage.getItem('currentTurn');

            return data
        }
    }
    
    return null
}

function clearGameData() {
    console.log('cleared local storage')

    localStorage.removeItem('positions');
    localStorage.removeItem('attackedCords');
    localStorage.removeItem('playerCharacter');
    localStorage.removeItem('currentTurn');
}

function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        (e.code === 22 ||
         
          e.code === 1014 ||
          
          e.name === "QuotaExceededError" ||
      
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        storage &&
        storage.length !== 0
      );
    }
  }

  export {saveData, loadData, clearGameData}