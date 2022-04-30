let tileDisplay = document.querySelector('.tile-box');
let keyboard = document.querySelector('.key-box');
let messageDisplay = document.querySelector('.message-box');
let languageDisplay = document.querySelector('.language-box');

let keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Backspace', 'Enter / Entrée'];

let triwordle = [
    ['SUPER', 'HAPPY', 'LOOKS', 'BERRY', 'TABLE', 'TIRED', 'BAKER', 'TIGER', 'PHONE', 'PARTY', 'TIMER', 'bossy', 'boxer', 'bunny', 'solid', 'cheer', 'smile', 'angry', 'timid', 'cloud', 'check', 'bliss', 'tough', 'peace', 'water', 'house', 'voice'], 
     ['feliz', 'tarde', 'bueno', 'miedo', 'volar', 'comer', 'vivir', 'noche', 'zorro', 'casco', 'barco', 'fresa', 'mundo', 'pardo', 'gusto', 'ganas', 'tener', 'salir', 'reloj', 'gorro', 'pluma', 'papel', 'color', 'aviso', 'negro', 'claro', 'lunes'],
     ['pouce', 'matin', 'mardi', 'lundi', 'trois', 'tigre', 'amour', 'vivre', 'chien', 'vache', 'plume', 'plage', 'payer', 'lapin', 'froid', 'chaud', 'blanc', 'heure', 'pluie', 'frigo', 'livre', 'champ', 'plein', 'vider', 'arbre', 'ombre', 'voler']
 ]
 let randomizer = Math.floor(Math.random() * (triwordle.flat().length)   );
 let wordle = triwordle.flat()[randomizer].toUpperCase();

let gameRows = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
]

let showLang = () => {
  if (langSeen == false) {  if (triwordle[0].includes(wordle.toLowerCase()) || triwordle[0].includes(wordle.toUpperCase())) {
        console.log('English!');
        let languageBox = document.createElement('p');
        languageBox.textContent = 'The Wordle is in English : D'
        languageDisplay.append(languageBox);
        langSeen = true;
        
    } else if (triwordle[1].includes(wordle.toLowerCase()) || triwordle[1].includes(wordle.toUpperCase())) {
        console.log('¡Español!');
        let languageBox = document.createElement('p');
        languageBox.textContent = 'El Wordle está en español : D'
        languageDisplay.append(languageBox);
        langSeen = true;
    } else {
        console.log('Francais!');
        let languageBox = document.createElement('p');
        languageBox.textContent = 'Le Wordle, c\'est francais : D'
        languageDisplay.append(languageBox);
        langSeen = true;
    }
   }
}


let handleClick = (key) => {
    console.log('clicked', key);
    showLang();
    if (key == '<<' || key == 'Backspace' || key == 'BACKSPACE') {
        deleteLetter();
        return;
    }
    if (key == 'ENTER' || key == 'Enter') {
        checkRow();
        return;
    }
    addLetter(key);
};

let addLetter = (key) => {
    if (currentTile < 5 && currentRow < 6) {
    let tile = document.getElementById('gameRow-' + currentRow + '-tile-' + currentTile);
    tile.textContent = key;
    tile.setAttribute('data', key);
    gameRows[currentRow][currentTile] = key;
    console.log('gameRows', gameRows)
    currentTile++;}
}

let deleteLetter = () => {
    if (currentTile > 0 && isGameOver == false) {
        currentTile--;
    } let tile = document.getElementById('gameRow-' + currentRow + '-tile-' + currentTile);
    tile.textContent = '';
    tile.setAttribute('data', '');
    gameRows[currentRow][currentTile] = '';
}

let checkRow = () => {
    let game = gameRows[currentRow].join('');
    if (currentTile > 4) {
        console.log('guess is ' + game);
       flipTile();
        if (wordle == game) {
            showMessage('Great job! ¡Buen trabajo! Bon travail!');
            console.log('woo!')
            isGameOver = true;
            seen = true;
            return;
        } else {
            if (currentRow >=5) {
                isGameOver = true;
                showMessage('Game over. Fin del juego. Fin du jeu');
                seen = true;
                return;
            } if (currentRow < 5) {
                currentRow++;
                currentTile = 0;
                
            }
        }
    }
    
}

let showMessage = (message) => {
    if (seen == false) {let messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
   // setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
    } 
}


let addColorToKey = (x, color) => {
    let key = document.getElementById(x);
    key.classList.add(color);
}

let flipTile = () => {
    let rowTiles = document.querySelector('#gameRow-' + currentRow).childNodes;
    let checkWordle = wordle;
    let game = [];

    rowTiles.forEach(tile => {
        game.push({letter: tile.getAttribute('data'), color: 'gray-overlay'});

    })
        game.forEach((game, index) => {
            if (game.letter == wordle[index]) {
                game.color = 'green-overlay';
                checkWordle = checkWordle.replace(game.letter, '');
            }
        })
        game.forEach(game => {
            if (checkWordle.includes(game.letter)) {
                game.color = 'yellow-overlay';
                checkWordle = checkWordle.replace(game.letter, '');
            }
        })
       
  

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip');
            tile.classList.add(game[index].color);
            addColorToKey(game[index].letter, game[index].color)
        }, 500 * index)
    })
}

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;
let seen = false;
let langSeen = false;

gameRows.forEach((gameRow, gameRowIndex) => {
    let rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'gameRow-' + gameRowIndex);
    gameRow.forEach((game, gameIndex) => {
        let tileElement = document.createElement('div');
        tileElement.setAttribute('id', 'gameRow-' + gameRowIndex + '-tile-' + gameIndex);
        tileElement.classList.add('tile');
        rowElement.append(tileElement)

    })
    tileDisplay.append(rowElement)

})


keys.forEach(keyId => {
    let buttonElement = document.createElement('button');
    buttonElement.textContent = keyId;
    buttonElement.setAttribute('id', keyId);
    buttonElement.addEventListener('click', () => handleClick(key));
    keyboard.append(buttonElement)
})

document.addEventListener('keydown', (event => {
    let key = event.key;
    console.log(key);
    let chain = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '<<', 'Backspace', 'Enter'];
    for (let i = 0; i < chain.length; i++) {
        if (key == chain[i] || key == chain[i].toLowerCase()) {
            console.log(key);
            handleClick(key.toUpperCase());
        }
    }
}))

